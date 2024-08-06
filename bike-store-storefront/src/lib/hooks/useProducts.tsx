import { ChildCategory, getProductsByCategoryHandle } from "@lib/data"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { useEffect, useState } from "react"
import { ProductPreviewType, SearchParams } from "src/types/global"

type useProductsProps = {
  countryCode: string
  searchParams: SearchParams
  prodLimit: number
  page: number
  handle: string
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
  const [childCategories, setChildCategories] = useState<ChildCategory[]>([])

  useEffect(() => {
    const getStoreData = async () => {
      const queryParams: StoreGetProductsParams = {
        limit: prodLimit,
      }

      const category = await getProductsByCategoryHandle({
        handle,
        page,
        queryParams,
        sortBy: searchParams?.sortBy,
        countryCode,
      })

      console.log(category)

      setProducts(category.response.products)
      setCount(category.response.count)
      setChildCategories(category.childCategories)
    }

    getStoreData()
  }, [countryCode, searchParams.page, handle])

  return {
    products,
    count,
    childCategories,
  }
}

export default useProducts
