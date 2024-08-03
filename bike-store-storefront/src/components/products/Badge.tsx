import Typography from "@components/common/Typography"
import { css, useTheme } from "@emotion/react"
import { FC, HTMLAttributes } from "react"

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

const Badge: FC<BadgeProps> = ({ children, ...props }) => {
  const theme = useTheme()

  const StyledBadge = css`
    display: inline;
    padding: ${`${theme.spacing.xs} ${theme.spacing.xl}`};
    border-radius: ${theme.borderRadius.full};
    border: 1px solid ${theme.colors.border.borderUiBorderStrong};
    background-color: ${theme.colors.background.bgUiBgBase};
    font-weight: 500;
    text-transform: uppercase;
  `

  return (
    <Typography variant="body2" component="div" css={StyledBadge} {...props}>
      {children}
    </Typography>
  )
}

export default Badge
