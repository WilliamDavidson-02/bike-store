import useDropDownContext from "@lib/hooks/useDropDownContext"
import { createContext, FC, HTMLAttributes, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import styled from "@emotion/styled"
import Slot from "@components/Slot"
import { SerializedStyles } from "@emotion/react"
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  stagger,
  Variants,
} from "framer-motion"
import { StyledCSS } from "src/types/global"
import Box from "./Box"
import { css } from "@emotion/react"

type DropDown = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DropDownContext = createContext<DropDown | null>(null)

type Children = React.ReactNode

type DropDownProps = {
  children: Children
}

export const DropDown: FC<DropDownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropDownContext.Provider value={{ isOpen, setIsOpen }}>
      <Box
        css={css`
          position: relative;
        `}
      >
        {children}
      </Box>
    </DropDownContext.Provider>
  )
}

/**
 * DropDownContent
 */

type Direction = "over" | "under"

type DropDownContentProps = HTMLAttributes<HTMLUListElement> & {
  children: Children
  direction?: Direction
} & HTMLMotionProps<"ul">

const StyledContent = styled(motion.ul)<StyledCSS & { direction: Direction }>`
  border: 1px solid ${({ theme }) => theme.colors.border.borderUiBorderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.shadowMd};
  overflow: hidden;
  position: absolute;

  ${({ direction, theme }) =>
    direction === "under"
      ? css`
          top: calc(100% + ${theme.spacing.lg});
        `
      : css`
          bottom: calc(100% + ${theme.spacing.lg});
        `}
  width: 100%;

  max-height: 800px;
  overflow-y: auto;

  @media (min-width: 600px) {
    width: fit-content;
    min-width: calc(600px - (${({ theme }) => theme.spacing.xl2} * 2));
  }

  ${({ css }) => css}
`

export const DropDownContent: FC<DropDownContentProps> = ({
  children,
  direction = "under",
  ...props
}) => {
  const { setIsOpen, isOpen } = useDropDownContext()
  const contentRef = useRef<HTMLUListElement | null>(null)
  const dy = direction === "under" ? "-8px" : "8px"

  useOnClickOutside(contentRef, ({ target }) => {
    const element = target as HTMLElement
    if (element.getAttribute("aria-label") === "drop-down-trigger") return

    setIsOpen(false)
  })

  useEventListener(
    "keydown",
    ({ key }) => key === "Escape" && isOpen && setIsOpen(false),
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <StyledContent
          direction={direction}
          initial={{ opacity: 0, y: dy }}
          animate={{
            opacity: 1,
            y: "0",
            transition: {
              staggerChildren: 0.05,
            },
          }}
          exit={{ opacity: 0, y: dy }}
          ref={contentRef}
          {...props}
        >
          {children}
        </StyledContent>
      )}
    </AnimatePresence>
  )
}

/**
 * DropDownItem
 */

type DropDownItemProps = HTMLAttributes<HTMLLIElement> & {
  children: Children
} & HTMLMotionProps<"li">

const StyledItem = styled(motion.li)<StyledCSS>`
  list-style: none;
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};

  &:first-of-type {
    padding-top: ${({ theme }) => theme.spacing.lg};
  }

  &:last-of-type {
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }

  transition: background-color 0.2s ease;

  @media (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.background.bgUiBgBaseHover};
    }
  }

  ${({ css }) => css}
`

const itemVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

export const DropDownItem: FC<DropDownItemProps> = ({ children, ...props }) => {
  const { setIsOpen } = useDropDownContext()

  return (
    <StyledItem
      variants={itemVariants}
      onClickCapture={() => setIsOpen(false)}
      {...props}
    >
      {children}
    </StyledItem>
  )
}

/**
 * DropDownTrigger
 */

type DropDownTriggerProps = {
  children: Children
} & (
  | {
      asChild?: false
      css?: SerializedStyles
    }
  | {
      asChild?: true
    }
)

const StyledTrigger = styled.div<StyledCSS>`
  cursor: pointer;
  ${({ css }) => css}
`

export const DropDownTrigger: FC<DropDownTriggerProps> = ({
  children,
  asChild = false,
}) => {
  const { setIsOpen } = useDropDownContext()
  const Comp = asChild ? Slot : StyledTrigger

  return (
    <Comp
      aria-label="drop-down-trigger"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {children}
    </Comp>
  )
}
