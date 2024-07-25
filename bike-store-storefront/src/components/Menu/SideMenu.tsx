import styled from "@emotion/styled"
import { FC, useEffect, useRef, useState } from "react"
import LocalLink from "../common/LocalLink"
import { useEventListener } from "usehooks-ts"
import { IsOpenType } from "./Nav"

const Aside = styled.aside<{ isOpen: IsOpenType }>`
  position: fixed;
  height: 100vh;
  width: 100%;
  bottom: 100%;
  transform: ${({ isOpen }) => (isOpen ? "translateY(100%)" : "")};
  transition: transform 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
  color: ${({ theme }) => theme.colors.foreground.textUiFgBase};
  padding: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: 1024px) {
    height: fit-content;
    bottom: 100%;
    transform: ${({ isOpen }) =>
      isOpen ? "translateY(calc(100% + 3rem))" : ""};
    border-bottom: 1px solid
      ${({ theme }) => theme.colors.border.borderUiBorderStrong};
  }
`

const Backdrop = styled.div`
  background-color: ${({ theme }) => theme.colors.background.bgUiBgOverlay};
  height: 100vh;
  width: 100%;
  position: fixed;
  inset: 0;
  display: "none";
  opacity: 0;
  transition: opacity 0.3s;
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
  user-select: none;
  transition: 0.2s;
  color: ${({ hovering, theme }) =>
    hovering ? theme.colors.foreground.textUiFgDisabled : "inherit"};

  & > a {
    width: 100%;
    display: block;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const SideMenuItems = {
  Helemets: "/helmets",
  "Riding Gear": "/riding-gear",
  Parts: "/parts",
  Accessories: "/accessories",
  Tires: "/tires",
  Sale: "/sale",
}

type HoverType = keyof typeof SideMenuItems | null

type SideMenuProps = {
  isOpen: IsOpenType
  setIsOpen: React.Dispatch<React.SetStateAction<IsOpenType>>
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, setIsOpen }) => {
  const [hoveredLink, setHoveredLink] = useState<HoverType>(null)

  const backdropRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const backdrop = backdropRef.current
    if (!backdrop) return

    if (isOpen) {
      backdrop.style.display = "block"
      setTimeout(() => {
        backdrop.style.opacity = "1"
      }, 10)
    } else {
      backdrop.style.opacity = "0"
      setTimeout(() => {
        backdrop.style.display = "none"
      }, 300)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    setHoveredLink(null)
  }

  useEventListener(
    "keydown",
    ({ key }) => key === "Escape" && isOpen && handleClose(),
  )

  return (
    <>
      <Backdrop ref={backdropRef} onClick={() => setIsOpen(false)} />
      <Aside isOpen={isOpen}>
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
      </Aside>
    </>
  )
}

export default SideMenu
