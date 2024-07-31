import { SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"
import { StyledCSS } from "src/types/global"

type BoxProps<T extends React.ElementType> = {
  component?: T
  children: React.ReactNode
  css?: SerializedStyles
} & React.ComponentPropsWithoutRef<T>

const StyledBox = styled("div")<StyledCSS>`
  display: flex;

  ${({ css }) => css}
`

const Box = <T extends React.ElementType = "div">({
  children,
  component,
  css,
  ...props
}: BoxProps<T>) => {
  return (
    <StyledBox as={component || "div"} css={css} {...props}>
      {children}
    </StyledBox>
  )
}

export default Box
