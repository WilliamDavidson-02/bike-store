import { Region, StoreGetProductsParams } from "@medusajs/medusa"
import { medusaClient } from "./config"
import { SortOptions } from "@components/store/RefinementList"
import { ProductPreviewType } from "src/types/global"
import transformProductPreview from "./util/transformProductsPreview"
import sortProducts from "./util/sortProducts"

const emptyResponse = {
  response: { products: [], count: 0 },
  nextPage: null,
}

/**
 * Region
 */

export const listRegions = async () => {
  return medusaClient.regions
    .list()
    .then(({ regions }) => regions)
    .catch((err) => {
      console.error(err)
      return null
    })
}

const regionMap = new Map<string, Region>()

export const getRegion = async (countryCode: string) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions) return null

    regions.forEach((r) => {
      r.countries.forEach((c) => {
        regionMap.set(c.iso_2, r)
      })
    })

    return regionMap.get(countryCode ? countryCode : "us")
  } catch (error: any) {
    console.log(error.toString())
    return null
  }
}

/**
 * Products
 */

type GetProductsList = {
  pageParam?: number
  queryParams?: StoreGetProductsParams
  countryCode: string
}

type GetProductsListResponse = {
  response: { products: ProductPreviewType[]; count: number }
  nextPage: number | null
  queryParams?: StoreGetProductsParams
}

export const getProductsList = async ({
  pageParam = 0,
  queryParams,
  countryCode,
}: GetProductsList): Promise<GetProductsListResponse> => {
  const limit = queryParams?.limit || 12

  const region = await getRegion(countryCode)

  if (!region) return emptyResponse

  const { products, count } = await medusaClient.products
    .list(
      {
        limit,
        offset: pageParam,
        region_id: region.id,
        ...queryParams,
      },
      { next: { tags: ["products"] } },
    )
    .then((res) => res)
    .catch((err) => {
      throw err
    })

  const transformedProducts = products.map((product) => {
    return transformProductPreview(product, region!)
  })

  const nextPage = count > pageParam + 1 ? pageParam + 1 : null

  return {
    response: { products: transformedProducts, count },
    nextPage,
    queryParams,
  }
}

type GetProductsListWithSort = {
  page?: number
  queryParams?: StoreGetProductsParams
  sortBy?: SortOptions
  countryCode: string
}

export const getProductsListWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: GetProductsListWithSort) => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}
