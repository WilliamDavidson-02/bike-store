import { ButtonHTMLAttributes, FC, ForwardedRef, forwardRef } from "react"
import styled from "@emotion/styled"
import { css, SerializedStyles } from "@emotion/react"
import { Theme } from "@emotion/react"
import Slot from "@components/Slot"

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
  variant: keyof typeof variantMap
}>`
  font-weight: 400;
  font-size: 1.0625rem;
  letter-spacing: -0.022em;
  line-height: 1.176;
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

  ${({ variant, theme }) => variantMap[variant](theme)}
  ${({ css }) => css}
`

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: keyof typeof variantMap
  css?: SerializedStyles
  asChild?: boolean
}

const Button: FC<ButtonProps> = forwardRef(
  (
    { children, variant = "interactive", css, asChild = false, ...props },
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <StyledButton
        as={asChild ? Slot : "button"}
        ref={ref}
        variant={variant}
        css={css}
        {...props}
      >
        {children}
      </StyledButton>
    )
  },
)

export default Button
