import Box from "@components/common/Box"
import { css, useTheme } from "@emotion/react"
import { ChildCategory } from "@lib/data"
import { Link, useParams } from "@tanstack/react-router"
import React, { FC } from "react"
import Breadcrumb, { BreadcrumbItem, BreadcrumbSeparator } from "./Breadcrumb"
import { useWindowSize } from "usehooks-ts"
import Typography from "@components/common/Typography"
import Button from "@components/common/Button"

type CategoriesProps = {
  splat?: string
  childCategories: ChildCategory[]
}

const Categories: FC<CategoriesProps> = ({ childCategories, splat }) => {
  const { _splat, countryCode } = useParams({ strict: false })

  const size = useWindowSize()
  const theme = useTheme()

  const breadcrumbs = splat?.split("/").map((handle) => {
    const title = handle
      .split("-")
      .map((w) => {
        const firstChar = w.slice(0, 1).toLocaleUpperCase()
        return firstChar + w.slice(1)
      })
      .join(" ")

    return { handle, title }
  })

  const getSplat = (handle: string) => {
    const handleIndex = breadcrumbs?.findIndex((c) => c.handle === handle) ?? 0
    const splat = breadcrumbs
      ?.slice(0, handleIndex + 1)
      .map((c) => c.handle)
      .join("/")

    return {
      _splat: `/${splat ?? handle}`,
    }
  }

  return (
    <section>
      {size.width > 800 && (
        <Breadcrumb>
          <Link
            to="/$countryCode/store"
            params={{ countryCode: countryCode ?? "" }}
          >
            <BreadcrumbItem isPage={!_splat}>Store</BreadcrumbItem>
          </Link>
          {breadcrumbs?.map((crumb, i) => (
            <React.Fragment key={crumb.handle}>
              <BreadcrumbSeparator />
              <Link
                to="/$countryCode/store/$"
                params={() => getSplat(crumb.handle)}
              >
                <BreadcrumbItem isPage={i === breadcrumbs.length - 1}>
                  {crumb.title}
                </BreadcrumbItem>
              </Link>
            </React.Fragment>
          ))}
        </Breadcrumb>
      )}
      <Box
        css={css`
          padding: ${theme.spacing.xl6} 0;

          @media (max-width: 600px) {
            padding: ${theme.spacing.xl3} 0;
            justify-content: center;
          }
        `}
      >
        <Typography variant={size.width <= 600 ? "h3" : "h1"} component="h1">
          {breadcrumbs ? breadcrumbs[breadcrumbs?.length - 1]?.title : "Store"}
        </Typography>
      </Box>
      <Box
        css={css`
          row-gap: ${theme.spacing.lg};
          column-gap: ${theme.spacing.xl};
          flex-wrap: wrap;

          @media (max-width: 600px) {
            justify-content: center;
          }
        `}
      >
        {childCategories.map((category) => (
          <Button key={category.handle} variant="interactive" asChild>
            <Link
              to="/$countryCode/store/$"
              params={{ _splat: `${splat ?? ""}/${category.handle}` }}
            >
              {category.name}
            </Link>
          </Button>
        ))}
      </Box>
    </section>
  )
}

export default Categories
