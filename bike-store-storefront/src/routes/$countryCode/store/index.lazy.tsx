import ProductPreview from "@components/products/ProductPreview"
import Categories from "@components/store/Categories"
import Pagination from "@components/store/Pagination"
import styled from "@emotion/styled"
import useProducts from "@lib/hooks/useProducts"
import { getPageNumber } from "@lib/utils"
import {
  createLazyFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router"
import { SearchParams } from "src/types/global"

const PRODUCT_LIMIT = 50

export const ProductList = styled.ul`
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
  const searchParams = useSearch({ strict: false }) as SearchParams
  const navigate = useNavigate({ from: "/$countryCode/store" })

  const page = getPageNumber(searchParams)

  const handlePageChange = (newPage: number) => {
    let params = searchParams
    params.page = newPage

    navigate({
      to: "/$countryCode/store",
      params: { countryCode },
      search: params,
    })
  }

  const { products, count, childCategories } = useProducts({
    handle: "all",
    countryCode,
    searchParams,
    prodLimit: PRODUCT_LIMIT,
    page,
  })

  return (
    <>
      <Categories childCategories={childCategories} />
      <ProductList>
        {products.map((product) => (
          <ProductPreview
            key={product.id}
            product={product}
            count={products.length}
          />
        ))}
      </ProductList>
      <Pagination
        handlePageChange={handlePageChange}
        page={page}
        totalPages={Math.ceil(count / PRODUCT_LIMIT)}
      />
    </>
  )
}

export const Route = createLazyFileRoute("/$countryCode/store/")({
  component: Store,
})
