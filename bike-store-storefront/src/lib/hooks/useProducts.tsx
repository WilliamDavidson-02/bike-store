import { getProductsByCategoryHandle } from "@lib/data"
import { useEffect, useState } from "react"
import { ProductPreviewType, SearchParams } from "src/types/global"

type useProductsProps = {
  countryCode: string
  searchParams: SearchParams
  prodLimit: number
  page: number
  handle: string
}

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
}

const useProducts = ({
  countryCode,
  searchParams,
  prodLimit,
  page,
  handle,
}: useProductsProps) => {
  const [products, setProducts] = useState<ProductPreviewType[]>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const getStoreData = async () => {
      const queryParams: PaginatedProductsParams = {
        limit: prodLimit,
      }

      const { response } = await getProductsByCategoryHandle({
        handle,
        page,
        queryParams,
        sortBy: searchParams?.sortBy,
        countryCode,
      })

      setProducts(response.products)
      setCount(response.count)
    }

    getStoreData()
  }, [countryCode, searchParams.page])

  return {
    products,
    count,
  }
}

export default useProducts
