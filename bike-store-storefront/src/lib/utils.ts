import { Region } from "@medusajs/medusa"
import { AnyProps, LocalStorageRegions } from "../types/utils"

export const getRegionMapFromLocalStorage = () => {
  const regionsString = localStorage.getItem("regions")

  if (!regionsString) return null

  const regions: LocalStorageRegions = JSON.parse(regionsString)

  if (new Date(regions.expires) < new Date()) return null

  const regionMap = new Map(regions.regionMap)

  return regionMap
}

export const mergeReactProps = (
  parentProps: AnyProps,
  childProps: AnyProps,
) => {
  // All child props should override.
  const overrideProps = { ...childProps }

  for (const propName in childProps) {
    const parentPropValue = parentProps[propName]
    const childPropValue = childProps[propName]

    const isHandler = /^on[A-Z]/.test(propName)
    // If it's a handler, modify the override by composing the base handler.
    if (isHandler) {
      // Only compose the handlers if both exist.
      if (childPropValue && parentPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue?.(...args)
          parentPropValue?.(...args)
        }
        // Otherwise, avoid creating an unnecessary callback.
      } else if (parentPropValue) {
        overrideProps[propName] = parentPropValue
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...parentPropValue, ...childPropValue }
    } else if (propName === "className") {
      overrideProps[propName] = [parentPropValue, childPropValue]
        .filter(Boolean)
        .join(" ")
    }
  }

  return { ...parentProps, ...overrideProps }
}
