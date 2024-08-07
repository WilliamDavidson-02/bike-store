import Box from "@components/common/Box"
import { css } from "@emotion/react"
import { ChildCategory } from "@lib/data"
import { Link, useParams } from "@tanstack/react-router"
import React, { FC } from "react"
import Breadcrumb, { BreadcrumbItem, BreadcrumbSeparator } from "./Breadcrumb"

type CategoriesProps = {
  splat?: string
  childCategories: ChildCategory[]
}

const Categories: FC<CategoriesProps> = ({ childCategories, splat }) => {
  const { _splat, countryCode } = useParams({ strict: false })

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
    <div>
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
      <Box
        css={css`
          display: flex;
          gap: 1rem;
        `}
      >
        {childCategories.map((category) => (
          <Link
            key={category.handle}
            to="/$countryCode/store/$"
            params={{ _splat: `${splat ?? ""}/${category.handle}` }}
          >
            {category.name}
          </Link>
        ))}
      </Box>
    </div>
  )
}

export default Categories
