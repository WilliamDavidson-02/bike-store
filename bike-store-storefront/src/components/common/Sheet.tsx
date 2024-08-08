import { createContext, FC, useContext, useRef, useState } from "react"
import styled from "@emotion/styled"
import Slot from "@components/Slot"
import { AnimatePresence, motion } from "framer-motion"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import Typography from "./Typography"

/**
 * Sheet
 */

type SheetProps = {
  children: React.ReactNode
}

type SheetContextProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SheetContext = createContext<SheetContextProps | null>(null)

export const Sheet: FC<SheetProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

const useSheetContext = () => {
  const context = useContext(SheetContext)

  if (!context) {
    throw Error("Can't use sheet context out side of the context provider!")
  }

  return context
}

/**
 * SheetContent
 */

type SheetContentProps = {
  children: React.ReactNode
}

const StyledContent = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 999;

  display: flex;
  flex-direction: column;

  height: 100vh;
  max-height: 100vh;
  width: 100%;
  max-width: 500px;

  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
  border-right: 1px solid
    ${({ theme }) => theme.colors.border.borderUiBorderStrong};
  padding: ${({ theme }) => theme.spacing.xl2};

  @media (min-width: 800px) {
    z-index: 10;
    padding-top: calc(${({ theme }) => theme.spacing.xl2} + 3rem);
  }
`

export const SheetContent: FC<SheetContentProps> = ({ children }) => {
  const { isOpen, setIsOpen } = useSheetContext()
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setIsOpen(false))
  useEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      ev.preventDefault()
      setIsOpen(false)
    }
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <StyledContent
          ref={ref}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{
            duration: 0.5,
            ease: [0.6, 0.18, 0.315, 0.905],
          }}
        >
          {children}
        </StyledContent>
      )}
    </AnimatePresence>
  )
}

/**
 * SheetBody
 */

type SheetBodyProps = {
  children: React.ReactNode
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-behavior: smooth;
`

export const SheetBody: FC<SheetBodyProps> = ({ children }) => {
  return <StyledBody>{children}</StyledBody>
}

/**
 * SheetTitle
 */

type SheetTitleProps = {
  children: React.ReactNode
}

export const SheetTitle: FC<SheetTitleProps> = ({ children }) => {
  return <Typography variant="h6">{children}</Typography>
}

/**
 * SheetHeader
 */

type SheetHeaderProps = {
  children: React.ReactNode
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.xl2};
`

export const SheetHeader: FC<SheetHeaderProps> = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>
}

/**
 * SheetFooter
 */

type SheetFooterProps = {
  children: React.ReactNode
}

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.xl2};
`

export const SheetFooter: FC<SheetFooterProps> = ({ children }) => {
  return <StyledFooter>{children}</StyledFooter>
}

/**
 * SheetClose
 */

type SheetCloseProps = {
  children: React.ReactNode
  asChild?: boolean
}

export const SheetClose: FC<SheetCloseProps> = ({ children, asChild }) => {
  const { setIsOpen } = useSheetContext()

  const Comp = asChild ? Slot : "div"

  return <Comp onClickCapture={() => setIsOpen(false)}>{children}</Comp>
}

/**
 * SheetTrigger
 */

type SheetTriggerProps = {
  children: React.ReactNode
  asChild?: boolean
}

export const SheetTrigger: FC<SheetTriggerProps> = ({ children, asChild }) => {
  const { setIsOpen } = useSheetContext()

  const Comp = asChild ? Slot : "div"

  return (
    <Comp onClickCapture={() => setIsOpen((prev) => !prev)}>{children}</Comp>
  )
}
