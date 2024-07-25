import { css, Global, ThemeProvider } from "@emotion/react"
import { FC } from "react"

type GlobalThemeProps = {
  children: React.ReactNode
}

export const globalTheme = {
  colors: {
    background: {
      bgUiBgBase: "rgba(255, 255, 255, 1)",
      bgUiBgBaseHover: "rgba(244, 244, 245, 1)",
      bgUiBgBasePressed: "rgba(228, 228, 231, 1)",
      bgUiBgComponent: "rgba(250, 250, 250, 1)",
      bgUiBgComponentHover: "rgba(244, 244, 245, 1)",
      bgUiBgComponentPressed: "rgba(228, 228, 231, 1)",
      bgUiBgDisabled: "rgba(244, 244, 245, 1)",
      bgUiBgField: "rgba(250, 250, 250, 1)",
      bgUiBgFieldComponent: "rgba(255, 255, 255, 1)",
      bgUiBgFieldComponentHover: "rgba(250, 250, 250, 1)",
      bgUiBgFieldHover: "rgba(244, 244, 245, 1)",
      bgUiBgHighlight: "rgba(239, 246, 255, 1)",
      bgUiBgHighlightHover: "rgba(219, 234, 254, 1)",
      bgUiBgInteractive: "rgba(59, 130, 246, 1)",
      bgUiBgOverlay: "rgba(9, 9, 11, 0.3)",
      bgUiBgSubtle: "rgba(250, 250, 250, 1)",
      bgUiBgSubtleHover: "rgba(244, 244, 245, 1)",
      bgUiBgSubtlePressed: "rgba(228, 228, 231, 1)",
      bgUiBgSwitchOff: "rgba(228, 228, 231, 1)",
      bgUiBgSwitchOffHover: "rgba(212, 212, 216, 1)",
    },
    foreground: {
      textUiFgBase: "rgba(9, 9, 11, 1)",
      textUiFgDisabled: "rgba(212, 212, 216, 1)",
      textUiFgError: "rgba(225, 29, 72, 1)",
      textUiFgInteractive: "rgba(59, 130, 246, 1)",
      textUiFgInteractiveHover: "rgba(37, 99, 235, 1)",
      textUiFgMuted: "rgba(161, 161, 170, 1)",
      textUiFgOnColor: "rgba(255, 255, 255, 1)",
      textUiFgOnInverted: "rgba(255, 255, 255, 1)",
      textUiFgSubtle: "rgba(82, 82, 91, 1)",
    },
    border: {
      borderUiBorderBase: "rgba(228, 228, 231, 1)",
      borderUiBorderDanger: "rgba(190, 18, 60, 1)",
      borderUiBorderError: "rgba(225, 29, 72, 1)",
      borderUiBorderInteractive: "rgba(59, 130, 246, 1)",
      borderUiBorderLoud: "rgba(9, 9, 11, 1)",
      borderUiBorderStrong: "rgba(212, 212, 216, 1)",
      borderUiBorderTransparent: "rgba(9, 9, 11, 0)",
    },
    button: {
      bgUiButtonDanger: "rgba(225, 29, 72, 1)",
      bgUiButtonDangerHover: "rgba(190, 18, 60, 1)",
      bgUiButtonDangerPressed: "rgba(159, 18, 57, 1)",
      bgUiButtonInverted: "rgba(9, 9, 11, 1)",
      bgUiButtonInvertedHover: "rgba(24, 24, 27, 1)",
      bgUiButtonInvertedPressed: "rgba(39, 39, 42, 1)",
      bgUiButtonNeutral: "rgba(255, 255, 255, 1)",
      bgUiButtonNeutralHover: "rgba(244, 244, 245, 1)",
      bgUiButtonNeutralPressed: "rgba(228, 228, 231, 1)",
      bgUiButtonInteractive: "rgba(59, 130, 246, 1)",
      bgUiButtonInteractiveHover: "rgba(37, 99, 235, 1)",
    },
    tag: {
      bgUiTagBlueBg: "rgba(219, 234, 254, 1)",
      bgUiTagBlueBgHover: "rgba(191, 219, 254, 1)",
      borderUiTagBlueBorder: "rgba(191, 219, 254, 1)",
      textUiTagBlueIcon: "rgba(37, 99, 235, 1)",
      textUiTagBlueText: "rgba(29, 78, 216, 1)",
      bgUiTagGreenBg: "rgba(209, 250, 229, 1)",
      bgUiTagGreenBgHover: "rgba(167, 243, 208, 1)",
      borderUiTagGreenBorder: "rgba(167, 243, 208, 1)",
      textUiTagGreenIcon: "rgba(5, 150, 105, 1)",
      textUiTagGreenText: "rgba(4, 120, 87, 1)",
      bgUiTagNeutralBg: "rgba(244, 244, 245, 1)",
      bgUiTagNeutralBgHover: "rgba(228, 228, 231, 1)",
      borderUiTagNeutralBorder: "rgba(228, 228, 231, 1)",
      textUiTagNeutralIcon: "rgba(113, 113, 122, 1)",
      textUiTagNeutralText: "rgba(82, 82, 91, 1)",
      bgUiTagOrangeBg: "rgba(254, 244, 199, 1)",
      bgUiTagOrangeBgHover: "rgba(253, 230, 138, 1)",
      borderUiTagOrangeBorder: "rgba(253, 230, 138, 1)",
      textUiTagOrangeIcon: "rgba(217, 119, 6, 1)",
      textUiTagOrangeText: "rgba(180, 83, 9, 1)",
      bgUiTagPurpleBg: "rgba(237, 233, 254, 1)",
      bgUiTagPurpleBgHover: "rgba(221, 214, 254, 1)",
      borderUiTagPurpleBorder: "rgba(221, 214, 254, 1)",
      textUiTagPurpleIcon: "rgba(124, 58, 237, 1)",
      textUiTagPurpleText: "rgba(109, 40, 217, 1)",
      bgUiTagRedBg: "rgba(255, 228, 230, 1)",
      bgUiTagRedBgHover: "rgba(254, 205, 211, 1)",
      borderUiTagRedBorder: "rgba(254, 205, 211, 1)",
      textUiTagRedIcon: "rgba(225, 29, 72, 1)",
      textUiTagRedText: "rgba(190, 18, 60, 1)",
    },
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
  spacing: {
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

          body {
            background-color: ${globalTheme.colors.background.bgUiBgBase};
            overflow-x: hidden;
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
