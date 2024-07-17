import { Region } from "@medusajs/medusa"

export type LocalStorageRegions = {
  expires: Date
  regionMap: Map<string, Region>
}
