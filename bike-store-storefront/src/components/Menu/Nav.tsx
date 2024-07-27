import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Hamburger from "./Hamburger"
import SideMenu from "./SideMenu"
import { Search, ShoppingBag } from "lucide-react"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { useEventListener, useWindowSize } from "usehooks-ts"
import { css } from "@emotion/react"
import { GlobalParams } from "src/types/global"
import { useProductCategories } from "medusa-react"
import { ProductCategory } from "@medusajs/medusa"
import Typography from "@components/common/Typography"
import Box from "@components/common/Box"

const Header = styled.header`
  position: sticky;
  inset: 0;
  height: 3rem;
  z-index: 50;

  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
  color: ${({ theme }) => theme.colors.foreground.textUiFgBase};
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border.borderUiBorderStrong};
`

const StyledNav = styled.nav`
  display: flex;
  align-items: center;

  max-width: 1024px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl2}`};

  @media (min-width: 1024px) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl3}`};
  }
`

const LogoContainer = styled.div<{ isOpen: boolean }>`
  z-index: 52;
  display: flex;
  align-items: center;

  & img {
    height: 2rem;
  }

  @media (max-width: 1024px) {
    flex-grow: 1;
    transition: opacity 0.5s ease;
    ${({ isOpen }) =>
      isOpen !== undefined &&
      css`
        opacity: ${isOpen ? "0" : "1"};
      `}
  }
`

const NavItem = styled.div<{ isOpen: boolean }>`
  z-index: 52;
  height: 100%;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  place-content: center;
  cursor: pointer;

  @media (max-width: 1024px) {
    transition: opacity 0.5s ease;
    ${({ isOpen }) =>
      isOpen !== undefined &&
      css`
        opacity: ${isOpen ? "0" : "1"};
      `}
  }
`

const Nav = () => {
  const { countryCode } = useParams({ strict: false }) as GlobalParams
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null)

  const size = useWindowSize()
  const navigate = useNavigate({ from: "/$countryCode" })

  const { product_categories, isLoading } = useProductCategories({
    q: "all",
    include_descendants_tree: true,
  })

  useEffect(() => {
    if (!isLoading && product_categories) {
      setCategories(product_categories[0].category_children)
    }
  }, [product_categories])

  const handleClose = () => {
    setSelectedCategory(null)
    setIsOpen(false)
  }

  const handleMouseEnter = (category: ProductCategory) => {
    setSelectedCategory(category)
    setIsOpen(true)
  }

  const handleMouseLeave = (ev: React.MouseEvent) => {
    const relatedTarget = ev.relatedTarget as Element

    if (relatedTarget?.localName !== "aside") handleClose()
  }

  useEventListener("resize", () => {
    if (window.innerWidth > 1024 && isOpen) handleClose()
  })

  return (
    <Header>
      <StyledNav>
        <LogoContainer isOpen={isOpen}>
          <Link to="/$countryCode" params={{ countryCode }}>
            <img src="/bike_store_logo.svg" alt="Bike store logo" />
          </Link>
        </LogoContainer>
        {size.width > 1024 && (
          <Box
            css={css`
              flex-grow: 1;
              justify-content: center;
              z-index: 52;
              height: 100%;
            `}
          >
            {categories.map((category) => (
              <Link
                to={`/$countryCode/${category.handle}`}
                params={{ countryCode }}
                key={category.id}
              >
                <NavItem
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}
                  isOpen={false}
                >
                  <Typography variant="subtitle1">{category.name}</Typography>
                </NavItem>
              </Link>
            ))}
          </Box>
        )}
        <NavItem isOpen={isOpen}>
          <Search />
        </NavItem>
        <NavItem
          onClick={() =>
            navigate({ to: "/$countryCode/cart", params: { countryCode } })
          }
          isOpen={isOpen}
        >
          <ShoppingBag />
        </NavItem>
        {size.width <= 1024 && (
          <NavItem isOpen={false}>
            <Hamburger
              isOpen={isOpen}
              onClick={() => {
                setIsOpen((prev) => !prev)
                setSelectedCategory(null)
              }}
            />
          </NavItem>
        )}
        <SideMenu
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          categories={categories}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </StyledNav>
    </Header>
  )
}

export default Nav
