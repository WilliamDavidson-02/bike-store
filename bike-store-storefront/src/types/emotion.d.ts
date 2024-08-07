import "@emotion/react"
import { globalTheme } from "@lib/theme"

type GlobalThemeType = typeof globalTheme

declare module "@emotion/react" {
  export interface Theme extends GlobalThemeType {}
}
