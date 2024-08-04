import { ButtonHTMLAttributes, FC, ForwardedRef, forwardRef } from "react"
import styled from "@emotion/styled"
import { typographyStyles } from "./Typography"
import { css, SerializedStyles, useTheme } from "@emotion/react"
import { Theme } from "@emotion/react"

const variantMap = {
  interactive: (theme: Theme) => css`
    background-color: ${theme.colors.button.bgUiButtonInteractive};
    color: ${theme.colors.foreground.textUiFgOnColor};

    @media (pointer: fine) {
      &:hover:not(:disabled) {
        background-color: ${theme.colors.button.bgUiButtonInteractiveHover};
      }
    }
  `,
  neutral: (theme: Theme) => css`
    background-color: ${theme.colors.button.bgUiButtonNeutral};
    color: ${theme.colors.foreground.textUiFgBase};

    @media (pointer: fine) {
      &:hover:not(:disabled) {
        background-color: ${theme.colors.button.bgUiButtonNeutralHover};
      }
    }
  `,
  inverted: (theme: Theme) => css`
    background-color: ${theme.colors.button.bgUiButtonInverted};
    color: ${theme.colors.foreground.textUiFgOnInverted};

    @media (pointer: fine) {
      &:hover:not(:disabled) {
        background-color: ${theme.colors.button.bgUiButtonInvertedHover};
      }
    }
  `,
  danger: (theme: Theme) => css`
    background-color: ${theme.colors.button.bgUiButtonDanger};
    color: ${theme.colors.foreground.textUiFgOnColor};

    @media (pointer: fine) {
      &:hover:not(:disabled) {
        background-color: ${theme.colors.button.bgUiButtonDangerHover};
      }
    }
  `,
  ghost: (theme: Theme) => css`
    background-color: transparent;
    color: ${theme.colors.button.bgUiButtonInverted};
  `,
} as const

const StyledButton = styled.button<{
  css?: SerializedStyles
  variant: SerializedStyles
}>`
  ${typographyStyles.button}
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xl3}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  border: none;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: background-color 0.2s;

  &:disabled {
    cursor: default;
  }

  ${({ variant }) => variant}
  ${({ css }) => css}
`

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: keyof typeof variantMap
  css?: SerializedStyles
  as?: React.ElementType<any, keyof React.JSX.IntrinsicElements>
}

const Button: FC<ButtonProps> = forwardRef(
  (
    { children, variant = "interactive", css, ...props },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const theme = useTheme()

    return (
      <StyledButton
        ref={ref}
        variant={variantMap[variant](theme)}
        css={css}
        {...props}
      >
        {children}
      </StyledButton>
    )
  },
)

export default Button
