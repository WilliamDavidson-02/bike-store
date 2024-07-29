import Typography from "@components/common/Typography"
import { css } from "@emotion/react"
import { FC, HTMLAttributes } from "react"

type SideMenuCategoryTitleProps = {
  children: React.ReactNode
} & HTMLAttributes<HTMLHeadingElement>

const SideMenuCategoryTitle: FC<SideMenuCategoryTitleProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography
      variant="h5"
      css={css`
        font-size: 1.75rem;
        line-height: 1.1428571429;

        & > a {
          width: 100%;
          display: block;
        }
      `}
      {...props}
    >
      {children}
    </Typography>
  )
}

export default SideMenuCategoryTitle
