import styled from "@emotion/styled"
import { useState } from "react"
import useClickOutside from "../../lib/hooks/useClickOutside"
import LocalLink from "../common/LocalLink"

const Aside = styled.aside`
  position: absolute;
  inset: 0;
  height: 100vh;
  max-width: 500px;
  padding: 1rem;
`

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => {
    if (isOpen) setIsOpen(false)
  })

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Menu</button>
      <Aside ref={ref}>
        <ul>
          <li>
            <LocalLink to="/">Home</LocalLink>
          </li>
        </ul>
      </Aside>
    </>
  )
}

export default SideMenu
