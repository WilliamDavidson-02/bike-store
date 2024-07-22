import styled from "@emotion/styled"
import { useState } from "react"
import useClickOutside from "../../lib/hooks/useClickOutside"
import LocalLink from "../common/LocalLink"
import { X } from "lucide-react"

const Aside = styled.aside<{ isOpen: boolean }>`
  position: absolute;
  inset: 0;
  height: 100vh;
  width: 100%;
  max-width: 500px;
  padding: ${({ theme }) => theme.padding.xl};
  left: 100%;
  transform: ${({ isOpen }) => (isOpen ? "translateX(-100%)" : "")};
  transition: transform 0.25s;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgInteractive};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  height: 100%;
  color: ${({ theme }) => theme.colors.foreground.textUiFgOnColor};
  padding: ${({ theme }) => theme.padding.xxl};
`

const Ul = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Li = styled.li<{ hovering: boolean | null }>`
  list-style-type: none;
  font-size: 2rem;
  width: 100%;
  text-align: end;
  position: relative;
  overflow-x: hidden;
  transition: 0.2s;
  color: ${({ hovering, theme }) =>
    hovering ? theme.colors.foreground.textUiFgInteractiveHover : "inherit"};

  & > a {
    width: 100%;
    display: block;
    padding: ${({ theme }) => theme.padding.lg};
  }
`

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

type HoverType = keyof typeof SideMenuItems | null

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<HoverType>(null)

  const handleClose = () => {
    setIsOpen(false)
    setHoveredLink(null)
  }

  const ref = useClickOutside(() => isOpen && handleClose())

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Menu</button>
      <Aside isOpen={isOpen} ref={ref}>
        <Container>
          <X onClick={handleClose} />
          <Ul>
            {Object.entries(SideMenuItems).map(([name, path]) => (
              <Li
                hovering={hoveredLink && hoveredLink !== name}
                onMouseEnter={() =>
                  setHoveredLink(name as keyof typeof SideMenuItems)
                }
                onMouseLeave={() => setHoveredLink(null)}
                onClick={handleClose}
                key={name}
              >
                <LocalLink to={path}>{name}</LocalLink>
              </Li>
            ))}
          </Ul>
        </Container>
      </Aside>
    </>
  )
}

export default SideMenu
