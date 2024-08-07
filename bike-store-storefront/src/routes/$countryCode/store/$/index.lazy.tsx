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
import Categories from "@components/store/Categories"

const PRODUCT_LIMIT = 50

export const StoreCategory = () => {
  const { _splat } = useParams({
    from: "/$countryCode/store/$/",
  })
  const searchParams = useSearch({ strict: false }) as SearchParams
  const navigate = useNavigate({ from: "/$countryCode/store/$" })

  const countryCode = window.location.pathname.split("/")[1]
  const page = getPageNumber(searchParams)
  const handle = _splat.split("/")[_splat.split("/").length - 1]

  const handlePageChange = (newPage: number) => {
    const params = searchParams
    params.page = newPage

    navigate({
      to: `${countryCode}/store/${_splat}`,
      search: params,
    })
  }

  const { products, count, childCategories } = useProducts({
    handle,
    countryCode,
    searchParams,
    prodLimit: PRODUCT_LIMIT,
    page,
  })

  return (
    <>
      <Categories splat={_splat} childCategories={childCategories} />
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

export const Route = createLazyFileRoute("/$countryCode/store/$/")({
  component: StoreCategory,
})
