import { FC } from "react"
import { useEventListener } from "usehooks-ts"
import styled from "@emotion/styled"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

const Aside = styled(motion.aside)`
  position: fixed;
  inset: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
  padding: ${({ theme }) => theme.spacing.xxl};
  padding-top: 3rem;
  z-index: 51;
`

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgOverlay};
  height: 100vh;
`

type SideMenuProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, setIsOpen }) => {
  useEventListener(
    "keydown",
    ({ key }) => key === "Escape" && isOpen && setIsOpen(false),
  )

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        clipPath: {
          duration: 0.5,
          ease: [0.6, 0.18, 0.315, 0.905],
        },
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <>
            <Backdrop
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <Aside
              key="aside"
              initial={{ clipPath: "rect(0 100% 0 0)" }}
              animate={{ clipPath: "rect(0 100% 100% 0)" }}
              exit={{ clipPath: "rect(0 100% 0 0)" }}
            >
              Aside
            </Aside>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

export default SideMenu
