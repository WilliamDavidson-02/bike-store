import { useState } from "react"
import styled from "@emotion/styled"
import Hamburger from "./Hamburger"
import SideMenu from "./SideMenu"
import { Search, ShoppingBag } from "lucide-react"
import { Link, useParams } from "@tanstack/react-router"

export type IsOpenType = boolean | null

const Header = styled.header`
  position: sticky;
  inset: 0;
`

const StyledNav = styled.nav`
  position: fixed;
  inset: 0;
  z-index: 50;
  height: 3rem;

  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
  color: ${({ theme }) => theme.colors.foreground.textUiFgBase};
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border.borderUiBorderStrong};
  padding: 0 ${({ theme }) => theme.spacing.xxl};

  @media (min-width: 1024px) {
    padding: 0 ${({ theme }) => theme.spacing.xxxl};
  }
`

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xxl};
`

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.foreground.textUiFgBase};
`

const Nav = () => {
  const { countryCode } = useParams({ strict: false })
  const [isOpen, setIsOpen] = useState<IsOpenType>(null)

  // const { product_categories, isLoading } = useProductCategories()

  // console.log({ isLoading, product_categories })

  return (
    <Header>
      <StyledNav>
        <Container>
          <Link to="/$countryCode" params={{ countryCode: countryCode ?? "" }}>
            <img height={32} src="/bike_store_logo.svg" alt="Bike store logo" />
          </Link>
          <IconsContainer>
            <Search strokeWidth={2} />
            <Link
              to="/$countryCode/cart"
              params={{ countryCode: countryCode ?? "" }}
            >
              <ShoppingBag strokeWidth={2} />
            </Link>
            <Hamburger
              isOpen={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </IconsContainer>
        </Container>
      </StyledNav>
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </Header>
  )
}

export default Nav
