import { SerializedStyles } from "@emotion/react"
import styled from "@emotion/styled"

type BoxProps<T extends React.ElementType> = {
  component?: T
  children: React.ReactNode
  css?: SerializedStyles
} & React.ComponentPropsWithoutRef<T>

const StyledBox = styled("div")<{ css?: SerializedStyles }>`
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
