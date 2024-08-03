import Box from "@components/common/Box"
import Typography from "@components/common/Typography"
import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { FC, HTMLAttributes } from "react"
import { ProductPreviewType } from "src/types/global"
import Badge from "./Badge"

type ProductPreviewProps = HTMLAttributes<HTMLLIElement> & {
  product: ProductPreviewType
  count: number
}

const Li = styled.li<{ count: number }>`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) =>
      theme.colors.border.borderUiBorderStrong};
    z-index: 2;
  }

  padding: ${({ theme }) => theme.spacing.xl2} 0;

  &:nth-last-of-type(-n + 1)::before {
    display: none;
  }

  @media (min-width: 800px) and (max-width: 1199px) {
    padding: ${({ theme }) => theme.spacing.xl2};

    &:nth-of-type(odd)::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: ${({ theme }) =>
        theme.colors.border.borderUiBorderStrong};
      z-index: 2;
    }

    ${({ count }) => css`
      &:nth-last-of-type(-n + ${count % 2 === 0 ? "2" : 1})::before {
        display: none;
      }
    `}
  }

  @media (min-width: 1200px) {
    padding: ${({ theme }) => theme.spacing.xl2};

    &:nth-of-type(3n + 1)::after,
    &:nth-of-type(3n + 2)::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: ${({ theme }) =>
        theme.colors.border.borderUiBorderStrong};
      z-index: 2;
    }

    ${({ count }) => css`
      &:nth-last-of-type(-n + ${count % 3 === 0 ? 3 : 1})::before {
        display: none;
      }
    `}
  }
`

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl4};
  height: 100%;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl};
`

const Display = styled.img`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  object-fit: contain;
  object-position: center;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
`

const ProductPreview: FC<ProductPreviewProps> = ({
  product,
  count,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Li count={count} {...props}>
      <Article>
        <Top>
          <Typography
            variant="h6"
            component="p"
            css={css`
              font-size: 20px;
            `}
          >
            {product.title}
          </Typography>
          <Box
            css={css`
              padding-top: ${theme.spacing.md};
              flex-direction: column;
            `}
          >
            <Typography variant="body1">
              {product.price?.calculated_price}
            </Typography>
            {product.price?.price_type === "sale" && (
              <Typography
                variant="body1"
                css={css`
                  color: ${theme.colors.foreground.textUiFgMuted};
                  text-decoration: line-through;
                `}
              >
                {product.price?.original_price}
              </Typography>
            )}
          </Box>
        </Top>
        <Display src={product.thumbnail ?? ""} alt={product.handle ?? ""} />
        <Box
          css={css`
            gap: ${theme.spacing.lg};
          `}
        >
          {product.badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </Box>
      </Article>
    </Li>
  )
}

export default ProductPreview
