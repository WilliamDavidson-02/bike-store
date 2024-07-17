import { LocalStorageRegions } from "../types/utils"

export const getRegionMapFromLocalStorage = () => {
  const regionsString = localStorage.getItem("regions")

  if (!regionsString) return null

  const regions: LocalStorageRegions = JSON.parse(regionsString)

  if (new Date(regions.expires) < new Date()) return null

  const regionMap = new Map(regions.regionMap)

  return regionMap
}
