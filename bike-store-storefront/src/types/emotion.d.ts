import "@emotion/react"
import { globalTheme } from "../components/GlobalTheme"

type GlobalThemeType = typeof globalTheme

declare module "@emotion/react" {
  export interface Theme extends GlobalThemeType {}
}
