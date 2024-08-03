import Box from "@components/common/Box"
import Typography from "@components/common/Typography"
import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { FC, HTMLAttributes } from "react"
import { ProductPreviewType } from "src/types/global"
import Badge from "./Badge"

type ProductPreviewProps = HTMLAttributes<HTMLLIElement> & {
  product: ProductPreviewType
}

const Article = styled.article`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  height: 100%;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl2};
`

const Display = styled.img`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  object-fit: contain;
  object-position: center;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
`

const ProductPreview: FC<ProductPreviewProps> = ({ product, ...props }) => {
  const theme = useTheme()

  return (
    <li {...props}>
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
            padding-top: ${theme.spacing.xl2};
            gap: ${theme.spacing.lg};
          `}
        >
          {product.badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </Box>
      </Article>
    </li>
  )
}

export default ProductPreview
