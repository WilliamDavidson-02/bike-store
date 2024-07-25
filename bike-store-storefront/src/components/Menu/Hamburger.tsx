import { css, keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { FC, HTMLAttributes } from "react"
import { IsOpenType } from "./Nav"

type HamburgerProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: IsOpenType
}

const firstLineForward = keyframes`
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(4px) rotate(0);
  }
  100% {
    transform: translateY(4px) rotate(45deg);
  }
`

const firstLineBackward = keyframes`
  0% {
    transform: translateY(4px) rotate(45deg);
  }
  50% {
    transform: translateY(4px) rotate(0);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
`

const secondLineForward = keyframes`
  0% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-4px) rotate(0);
  }
  100% {
    transform: translateY(-4px) rotate(-45deg);
  }
`

const secondLineBackward = keyframes`
  0% {
    transform: translateY(-4px) rotate(-45deg);
  }
  50% {
    transform: translateY(-4px) rotate(0);
  }
  100% {
    transform: translateY(0) rotate(0);
  }
`

const Container = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};

  cursor: pointer;
`

const Line = styled.div<{ isOpen: IsOpenType }>`
  width: 100%;
  height: 2px;
  border-radius: 100vmax;
  background-color: ${({ theme }) => theme.colors.foreground.textUiFgSubtle};

  transform-origin: center;

  &:nth-of-type(1) {
    ${({ isOpen }) =>
      isOpen !== null &&
      css`
        animation: ${isOpen ? firstLineForward : firstLineBackward} 0.5s
          forwards ease-in-out;
      `}
  }

  &:nth-of-type(2) {
    ${({ isOpen }) =>
      isOpen !== null &&
      css`
        animation: ${isOpen ? secondLineForward : secondLineBackward} 0.5s
          forwards ease-in-out;
      `}
  }
`

const Hamburger: FC<HamburgerProps> = ({ isOpen, ...props }) => {
  return (
    <Container {...props}>
      <Line isOpen={isOpen} />
      <Line isOpen={isOpen} />
    </Container>
  )
}

export default Hamburger
