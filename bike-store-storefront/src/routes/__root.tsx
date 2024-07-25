import { MedusaProvider } from "medusa-react"
import { QueryClient } from "@tanstack/react-query"
import {
  createRootRoute,
  notFound,
  Outlet,
  redirect,
} from "@tanstack/react-router"
import Nav from "@components/Menu/Nav"
import { Region } from "@medusajs/medusa"
import LocalLink from "@components/common/LocalLink"
import GlobalTheme from "@components/GlobalTheme"
import { getRegionMapFromLocalStorage } from "@lib/utils"

const BASE_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL
const DEFAULT_REGION: string = import.meta.env.VITE_DEFAULT_REGION ?? "us"
const queryClient = new QueryClient()

type RegionsResponse = {
  regions: Region[]
}

export const Route = createRootRoute({
  component: () => (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={BASE_URL}
    >
      <GlobalTheme>
        <Nav />
        <Outlet />
      </GlobalTheme>
    </MedusaProvider>
  ),
  notFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
        <LocalLink to="/">Go home</LocalLink>
      </div>
    )
  },
  beforeLoad: async ({ location, params }) => {
    const getRegionMap = async () => {
      const response = await fetch(`${BASE_URL}/store/regions`)
      const data: RegionsResponse | null = await response.json()

      if (!data || !data.regions) throw notFound()

      let regionMap = new Map<string, Region>()

      // Create a map of country codes to regions.
      data.regions.forEach((region) => {
        region.countries.forEach((c) => {
          regionMap.set(c.iso_2, region)
        })
      })

      const expires = new Date()
      expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000) // 1 hour from now

      const regionMapArray = Array.from(regionMap.entries())
      localStorage.setItem(
        "regions",
        JSON.stringify({ expires, regionMap: regionMapArray }),
      )

      return regionMap
    }

    const getCountryCode = async (urlCountryCode: string) => {
      let regionMap = getRegionMapFromLocalStorage()
      if (!regionMap) regionMap = await getRegionMap()

      if (regionMap.has(urlCountryCode)) return urlCountryCode
      return DEFAULT_REGION
    }

    /**
     * Middleware
     */

    const pathname = location.pathname

    const urlCountryCode = pathname.split("/")[1].toLowerCase()
    const countryCode = await getCountryCode(urlCountryCode)

    const newParams = params as { countryCode: string }
    const redirectPath = pathname
      .split("/")
      .filter((p) => p !== newParams.countryCode)
      .join("/")

    const searchParams = new URLSearchParams(location.search)
    const searchParamsObject = Object.fromEntries(searchParams.entries())

    const isSearchEmpty = Object.keys(searchParamsObject).length === 0

    const queryString = !isSearchEmpty ? `?${searchParams.toString()}` : ""

    // If no country code is set, we redirect to the relevant region.
    if (urlCountryCode !== countryCode) {
      redirect({
        to: `/${countryCode}${redirectPath}${queryString}`,
        throw: true,
      })
    }
  },
})
