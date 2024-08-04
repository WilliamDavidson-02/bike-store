import {
  ProductCategory,
  Region,
  StoreGetProductsParams,
} from "@medusajs/medusa"
import { medusaClient } from "./config"
import { SortOptions } from "@components/store/RefinementList"
import {
  ProductCategoryWithChildren,
  ProductPreviewType,
} from "src/types/global"
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

/**
 * Categories
 */

type GetCategoriesList = {
  product_categories: ProductCategoryWithChildren[]
  count: number
}

export const getCategoriesList = async (
  offset: number = 0,
  limit: number = 100,
): Promise<GetCategoriesList> => {
  const { product_categories, count } = await medusaClient.productCategories
    .list({ limit, offset })
    .catch((error) => {
      throw error
    })

  return {
    product_categories,
    count,
  }
}

type GetCategoryByHandle = {
  product_categories: ProductCategoryWithChildren[]
}

export const getCategoryByHandle = async (
  categoryHandle: string[],
): Promise<GetCategoryByHandle> => {
  const handles = categoryHandle.map((_, index: number) =>
    categoryHandle.slice(0, index + 1).join("/"),
  )

  const product_categories = [] as ProductCategoryWithChildren[]

  for (const handle of handles) {
    const category = await medusaClient.productCategories
      .list({
        handle: handle,
      })
      .then(({ product_categories: { [0]: category } }) => category)
      .catch(() => {
        return {} as ProductCategory
      })

    product_categories.push(category)
  }

  return {
    product_categories,
  }
}

type GetProductsByCategoryhandleProps = {
  page?: number
  handle: string
  countryCode: string
  sortBy?: SortOptions
  queryParams?: StoreGetProductsParams
}

type ChildCategory = {
  handle: string
  name: string
}

type GetProductsByCategoryhandle = {
  name: string
  handle: string
  childCategories: ChildCategory[]
  response: { products: ProductPreviewType[]; count: number }
  nextPage: number | null
}

export const getProductsByCategoryHandle = async ({
  page = 0,
  handle,
  countryCode,
  sortBy,
  queryParams,
}: GetProductsByCategoryhandleProps): Promise<GetProductsByCategoryhandle> => {
  const category = await getCategoryByHandle([handle]).then(
    (res) => res.product_categories[0],
  )

  const childCategories = category.category_children.map(
    ({ handle, name }) => ({ handle, name }),
  )

  const { response, nextPage } = await getProductsListWithSort({
    page,
    queryParams: { ...queryParams, category_id: [category.id] },
    countryCode,
    sortBy,
  })
    .then((res) => res)
    .catch((err) => {
      throw err
    })

  return {
    handle: category.handle,
    name: category.name,
    childCategories: childCategories,
    response,
    nextPage,
  }
}
