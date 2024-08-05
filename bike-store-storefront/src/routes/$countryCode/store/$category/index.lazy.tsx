import ProductPreview from "@components/products/ProductPreview"
import Pagination from "@components/store/Pagination"
import useProducts from "@lib/hooks/useProducts"
import {
  createLazyFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router"
import { SearchParams } from "src/types/global"
import { ProductList } from "../index.lazy"
import { getPageNumber } from "@lib/utils"

const PRODUCT_LIMIT = 50

export const StoreCategory = () => {
  const { countryCode, category } = useParams({
    from: "/$countryCode/store/$category/",
  })
  const searchParams = useSearch({ strict: false }) as SearchParams
  const navigate = useNavigate({ from: "/$countryCode/store/$category" })

  const page = getPageNumber(searchParams)

  const handlePageChange = (newPage: number) => {
    let params = searchParams
    params.page = newPage

    navigate({
      to: "/$countryCode/store/$category",
      params: { countryCode },
      search: params,
    })
  }

  const { products, count } = useProducts({
    handle: category,
    countryCode,
    searchParams,
    prodLimit: PRODUCT_LIMIT,
    page,
  })

  return (
    <>
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

export const Route = createLazyFileRoute("/$countryCode/store/$category/")({
  component: StoreCategory,
})
