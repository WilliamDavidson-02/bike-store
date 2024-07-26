import { useState } from "react"
import styled from "@emotion/styled"
import Hamburger from "./Hamburger"
import SideMenu from "./SideMenu"
import { Search, ShoppingBag } from "lucide-react"
import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { useWindowSize } from "usehooks-ts"
import { css } from "@emotion/react"
import { GlobalParams } from "src/types/global"

const SideMenuItems = {
  Helemets: "/helmets",
  "Riding Gear": "/riding-gear",
  Parts: "/parts",
  Accessories: "/accessories",
  Tires: "/tires",
  Sale: "/sale",
  Account: "/account",
}

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
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xxl}`};

  @media (min-width: 1024px) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xxxl}`};
  }
`

const LogoContainer = styled.div<{ isOpen: boolean }>`
  z-index: 52;
  flex-grow: 1;
  display: flex;
  align-items: center;

  & img {
    height: 2rem;
  }

  @media (max-width: 1024px) {
    transition: opacity 0.5s ease;
    ${({ isOpen }) =>
      isOpen !== undefined &&
      css`
        opacity: ${isOpen ? "0" : "1"};
      `}
  }
`

const IconContainer = styled.div<{ isOpen: boolean }>`
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

  const size = useWindowSize()
  const navigate = useNavigate({ from: "/$countryCode" })

  // const { product_categories, isLoading } = useProductCategories()

  // console.log({ isLoading, product_categories })

  return (
    <Header>
      <StyledNav>
        <LogoContainer isOpen={isOpen}>
          <Link to="/$countryCode" params={{ countryCode }}>
            <img src="/bike_store_logo.svg" alt="Bike store logo" />
          </Link>
        </LogoContainer>
        <IconContainer isOpen={isOpen}>
          <Search />
        </IconContainer>
        <IconContainer
          onClick={() =>
            navigate({ to: "/$countryCode/cart", params: { countryCode } })
          }
          isOpen={isOpen}
        >
          <ShoppingBag />
        </IconContainer>
        <IconContainer isOpen={false}>
          <Hamburger
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </IconContainer>
        <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </StyledNav>
    </Header>
  )
}

export default Nav
