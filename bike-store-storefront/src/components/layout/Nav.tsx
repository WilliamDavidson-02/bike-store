import styled from "@emotion/styled"
import SideMenu from "./SideMenu"

const Wrapper = styled.div`
  position: sticky;
  inset: 0;
  z-index: 50;
`

const Header = styled.header`
  position: relative;
  height: 5rem;
`

const Nav = () => {
  return (
    <Wrapper>
      <Header>
        <SideMenu />
      </Header>
    </Wrapper>
  )
}

export default Nav
