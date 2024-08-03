import ProductPreview from "@components/products/ProductPreview"
import { SortOptions } from "@components/store/RefinementList"
import styled from "@emotion/styled"
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

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  list-style: none;

  @media (min-width: 800px) and (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

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

      console.log(response.products)

      setProducts(response.products)
      setCount(response.count)
    }

    getStoreData()
  }, [countryCode])

  return (
    <>
      <ProductList>
        {products.map((product) => (
          <ProductPreview key={product.id} product={product} count={count} />
        ))}
      </ProductList>
    </>
  )
}

export const Route = createLazyFileRoute("/$countryCode/store/")({
  component: Store,
})
