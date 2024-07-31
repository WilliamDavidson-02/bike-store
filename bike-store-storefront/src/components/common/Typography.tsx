import styled from "@emotion/styled"
import { css, SerializedStyles } from "@emotion/react"
import { TypographyVariants, variants } from "src/types/typography"
import { StyledCSS } from "src/types/global"

type TypographyProps<T extends React.ElementType> = {
  variant?: TypographyVariants
  component?: T
  children: React.ReactNode
  css?: SerializedStyles
} & React.ComponentPropsWithoutRef<T>

export const typographyStyles: Record<TypographyVariants, SerializedStyles> = {
  h1: css`
    font-weight: 300;
    font-size: 6rem;
    letter-spacing: -1.5px;
  `,
  h2: css`
    font-weight: 300;
    font-size: 3.75rem;
    letter-spacing: -0.5px;
  `,
  h3: css`
    font-weight: 400;
    font-size: 3rem;
    letter-spacing: 0px;
  `,
  h4: css`
    font-weight: 400;
    font-size: 2.125rem;
    letter-spacing: 0.25px;
  `,
  h5: css`
    font-weight: 400;
    font-size: 1.5rem;
    letter-spacing: 0px;
  `,
  h6: css`
    font-weight: 500;
    font-size: 1.5rem;
    letter-spacing: 0.15px;
  `,
  subtitle1: css`
    font-weight: 400;
    font-size: 1rem;
    letter-spacing: 0.15px;
  `,
  subtitle2: css`
    font-weight: 500;
    font-size: 0.875rem;
    letter-spacing: 0.25px;
  `,
  body1: css`
    font-weight: 400;
    font-size: 1rem;
    letter-spacing: 0.5px;
  `,
  body2: css`
    font-weight: 400;
    font-size: 0.875rem;
    letter-spacing: 0.25px;
  `,
  button: css`
    font-weight: 400;
    font-size: 1.0625rem;
    letter-spacing: -0.022em;
    line-height: 1.176;
  `,
  caption: css`
    font-weight: 400;
    font-size: 0.75rem;
    letter-spacing: 0.4px;
  `,
  overline: css`
    font-weight: 400;
    font-size: 0.625rem;
    letter-spacing: 1.5px;
  `,
}

const StyledComponents: Record<TypographyVariants, React.ElementType> =
  Object.keys(typographyStyles).reduce(
    (acc, key) => {
      const variant = key as TypographyVariants
      acc[variant] = styled(variants[variant])<StyledCSS>`
        ${typographyStyles[variant]}
        ${({ css }) => css}
      `
      return acc
    },
    {} as Record<TypographyVariants, React.ElementType>,
  )

const Typography = <T extends React.ElementType = "p">({
  children,
  component,
  variant = "body1",
  ...props
}: TypographyProps<T>) => {
  const Component = StyledComponents[variant]

  return (
    <Component as={component} css={css} {...props}>
      {children}
    </Component>
  )
}

export default Typography
