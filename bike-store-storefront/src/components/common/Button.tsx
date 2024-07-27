import { ButtonHTMLAttributes, FC } from "react"
import styled from "@emotion/styled"
import { typographyStyles } from "./Typography"
import { css, SerializedStyles, useTheme } from "@emotion/react"
import { Theme } from "@emotion/react"

const variantMap = {
  interactive: (theme: Theme) => css`
    background-color: ${theme.colors.button.bgUiButtonInteractive};
    color: ${theme.colors.foreground.textUiFgOnColor};

    &:hover {
      background-color: ${theme.colors.button.bgUiButtonInteractiveHover};
    }
  `,
  neutral: (theme: Theme) => css`
    background-color: ${theme.colors.button.bgUiButtonNeutral};
    color: ${theme.colors.foreground.textUiFgBase};

    &:hover {
      background-color: ${theme.colors.button.bgUiButtonNeutralHover};
    }
  `,
  inverted: (theme: Theme) => css`
    background-color: ${theme.colors.button.bgUiButtonInverted};
    color: ${theme.colors.foreground.textUiFgOnInverted};

    &:hover {
      background-color: ${theme.colors.button.bgUiButtonInvertedHover};
    }
  `,
  danger: (theme: Theme) => css`
    background-color: ${theme.colors.button.bgUiButtonDanger};
    color: ${theme.colors.foreground.textUiFgOnColor};

    &:hover {
      background-color: ${theme.colors.button.bgUiButtonDangerHover};
    }
  `,
  ghost: (theme: Theme) => css`
    background-color: transparent;
    color: ${theme.colors.foreground.textUiFgInteractive};
  `,
} as const

const StyledButton = styled.button<{
  css?: SerializedStyles
  variant: SerializedStyles
}>`
  ${typographyStyles.button}
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xl3}`};
  border-radius: 100vmax;

  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s;

  ${({ variant }) => variant}
  ${({ css }) => css}
`

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: keyof typeof variantMap
  css?: SerializedStyles
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "interactive",
  css,
  ...props
}) => {
  const theme = useTheme()

  return (
    <StyledButton variant={variantMap[variant](theme)} css={css} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
