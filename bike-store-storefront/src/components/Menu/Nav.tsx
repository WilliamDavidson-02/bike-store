import { useState } from "react"
import styled from "@emotion/styled"
import Hamburger from "./Hamburger"
import SideMenu from "./SideMenu"

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

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-content: center;
  justify-content: center;
`

const Nav = () => {
  const [isOpen, setIsOpen] = useState<IsOpenType>(null)

  // const { product_categories, isLoading } = useProductCategories()

  // console.log({ isLoading, product_categories })

  return (
    <Header>
      <StyledNav>
        <Container>
          <Hamburger
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </Container>
      </StyledNav>
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </Header>
  )
}

export default Nav
