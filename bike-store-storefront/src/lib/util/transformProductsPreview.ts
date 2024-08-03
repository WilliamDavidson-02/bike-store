import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Badges, ProductPreviewType } from "src/types/global"
import { CalculatedVariant } from "src/types/medusa"
import { getPercentageDiff } from "./getPrecentageDiff"
import { formatAmount } from "./price"

const isSoldOut = ({ variants }: PricedProduct) => {
  let inventory = 0
  variants.forEach((v) => {
    if (!v.inventory_quantity) return

    inventory = v.inventory_quantity
  })
  return !inventory
}

const isNew = (date: Date) => {
  const currentDate = new Date()
  const extraMonth = new Date(date)
  extraMonth.setMonth(extraMonth.getMonth() + 1)

  return currentDate <= extraMonth
}

const transformProductPreview = (
  product: PricedProduct,
  region: Region,
): ProductPreviewType => {
  const variants = product.variants as unknown as CalculatedVariant[]

  let cheapestVariant = undefined

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.calculated_price > curr.calculated_price) {
        return curr
      }
      return acc
    }, variants[0])
  }

  let badges: Badges = []

  if (isNew(product.created_at ?? new Date())) badges.push("new")
  if (isSoldOut(product)) badges.push("sold out")

  return {
    id: product.id!,
    title: product.title!,
    subtitle: product.subtitle!,
    handle: product.handle!,
    thumbnail: product.thumbnail!,
    created_at: product.created_at,
    price: cheapestVariant
      ? {
          calculated_price: formatAmount({
            amount: cheapestVariant.calculated_price,
            region: region,
            includeTaxes: false,
          }),
          original_price: formatAmount({
            amount: cheapestVariant.original_price,
            region: region,
            includeTaxes: false,
          }),
          difference: getPercentageDiff(
            cheapestVariant.original_price,
            cheapestVariant.calculated_price,
          ),
          price_type: cheapestVariant.calculated_price_type,
        }
      : undefined,
    badges: badges,
  }
}

export default transformProductPreview
