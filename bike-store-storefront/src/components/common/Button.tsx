import { ButtonHTMLAttributes, FC } from "react"
import styled from "@emotion/styled"
import Typography from "./Typography"

const BaseButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xxxl}`};
  border-radius: 100vmax;

  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s;
`

const InteractiveButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.button.bgUiButtonInteractive};
  color: ${({ theme }) => theme.colors.foreground.textUiFgOnColor};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.button.bgUiButtonInteractiveHover};
  }
`

const NeutralButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.button.bgUiButtonNeutral};
  color: ${({ theme }) => theme.colors.foreground.textUiFgBase};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.button.bgUiButtonNeutralHover};
  }
`

const GhostButton = styled(BaseButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground.textUiFgInteractive};
`

const InvertedButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.button.bgUiButtonInverted};
  color: ${({ theme }) => theme.colors.foreground.textUiFgOnInverted};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.button.bgUiButtonInvertedHover};
  }
`

const DangerButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.button.bgUiButtonDanger};
  color: ${({ theme }) => theme.colors.foreground.textUiFgOnColor};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.button.bgUiButtonDangerHover};
  }
`

const variantMap = {
  interactive: InteractiveButton,
  neutral: NeutralButton,
  inverted: InvertedButton,
  danger: DangerButton,
  ghost: GhostButton,
} as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: keyof typeof variantMap
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "interactive",
  ...props
}) => {
  const Component = variantMap[variant]
  return (
    <Component {...props}>
      <Typography variant="button">{children}</Typography>
    </Component>
  )
}

export default Button
