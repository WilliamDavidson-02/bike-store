import { css, Global, ThemeProvider } from "@emotion/react"
import { globalTheme } from "@lib/theme"
import { FC } from "react"

type GlobalThemeProps = {
  children: React.ReactNode
}

const GlobalTheme: FC<GlobalThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: "Poppins", sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
            font-variation-settings: "slnt" 0;
          }

          body {
            background-color: ${globalTheme.colors.background.bgUiBgBase};
            overflow-x: hidden;
            scroll-behavior: smooth;
          }

          a {
            text-decoration: none;
            color: inherit;
          }

          button {
            cursor: pointer;
          }
        `}
      />
      {children}
    </ThemeProvider>
  )
}

export default GlobalTheme
