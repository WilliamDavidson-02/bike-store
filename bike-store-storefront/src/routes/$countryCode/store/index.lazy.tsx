import { SortOptions } from "@components/store/RefinementList"
import { getProductsListWithSort } from "@lib/data"
import {
  createLazyFileRoute,
  useParams,
  useSearch,
} from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { ProductPreviewType } from "src/types/global"

const PRODUCT_LIMIT = 12

type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

export const Store = () => {
  const { countryCode } = useParams({ from: "/$countryCode/store/" })
  const { searchParams } = useSearch({ strict: false }) as Params

  const [products, setProducts] = useState<ProductPreviewType[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const getStoreData = async () => {
      const queryParams: PaginatedProductsParams = {
        limit: PRODUCT_LIMIT,
      }

      const pageNumber = searchParams?.page ? parseInt(searchParams?.page) : 1

      const { response } = await getProductsListWithSort({
        page: pageNumber,
        queryParams,
        sortBy: searchParams?.sortBy,
        countryCode,
      })

      setProducts(response.products)
      setCount(response.count)
    }

    getStoreData()
  }, [countryCode])

  return <div>Hello /$countryCode/store/!</div>
}

export const Route = createLazyFileRoute("/$countryCode/store/")({
  component: Store,
})
