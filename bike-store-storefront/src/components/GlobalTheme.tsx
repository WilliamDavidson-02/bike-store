import { css, Global, ThemeProvider } from "@emotion/react"
import { FC } from "react"

type GlobalThemeProps = {
  children: React.ReactNode
}

export const globalTheme = {
  colors: {
    white: "#ffffff",
    black: "#111111",
    blue: "#295EFF",
    blueDark: "#2A57D3",
    blueLight: "#4190F1",
  },
  borderRadius: {
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    xxl: "16px",
    xxxl: "24px",
    full: "100vmax",
  },
  padding: {
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    xxl: "16px",
    xxxl: "24px",
  },
} as const

const GlobalTheme: FC<GlobalThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: "Inter", sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
            font-variation-settings: "slnt" 0;
          }

          a {
            text-decoration: none;
            color: inherit;
          }
        `}
      />
      {children}
    </ThemeProvider>
  )
}

export default GlobalTheme
