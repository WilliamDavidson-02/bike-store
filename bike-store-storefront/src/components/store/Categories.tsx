import Box from "@components/common/Box"
import { css } from "@emotion/react"
import { ChildCategory } from "@lib/data"
import { Link } from "@tanstack/react-router"
import { FC } from "react"

type CategoriesProps = {
  splat?: string
  childCategories: ChildCategory[]
}

const Categories: FC<CategoriesProps> = ({ childCategories, splat }) => {
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

  return (
    <div>
      <div>
        <span>Store</span>
        {breadcrumbs?.map((crumb) => (
          <span key={crumb.handle}>/{crumb.title}</span>
        ))}
      </div>
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
            params={{ _splat: `${splat}/${category.handle}` }}
          >
            {category.name}
          </Link>
        ))}
      </Box>
    </div>
  )
}

export default Categories
