import { FC } from "react"
import { useEventListener } from "usehooks-ts"
import styled from "@emotion/styled"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ProductCategory } from "@medusajs/medusa"

const Aside = styled(motion.aside)`
  position: fixed;
  inset: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
  padding: ${({ theme }) => theme.spacing.xl2};
  padding-top: ${({ theme }) =>
    `calc(${theme.spacing.xl5} + ${theme.spacing.xl2})`};
  z-index: 51;

  @media (min-width: 1024px) {
    height: fit-content;

    padding: ${({ theme }) => `${theme.spacing.xl6} ${theme.spacing.xl3}`};
    padding-top: ${({ theme }) =>
      `calc(${theme.spacing.xl5} + ${theme.spacing.xl6})`};
  }
`

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(2px);
  background-color: ${({ theme }) => theme.colors.background.bgUiBgOverlay};
  height: 100vh;
`

type SideMenuProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  categories: ProductCategory[]
  selectedCategory: ProductCategory | null
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ProductCategory | null>
  >
}

const SideMenu: FC<SideMenuProps> = ({
  isOpen,
  setIsOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  useEventListener(
    "keydown",
    ({ key }) => key === "Escape" && isOpen && setIsOpen(false),
  )

  const handleMouseLeave = () => {
    setIsOpen(false)
    setSelectedCategory(null)
  }

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
              initial={{ clipPath: "rect(0 100% 3rem 0)" }}
              animate={{ clipPath: "rect(0 100% 100% 0)" }}
              exit={{ clipPath: "rect(0 100% 3rem 0)" }}
              onMouseLeave={handleMouseLeave}
            >
              {selectedCategory
                ? selectedCategory.category_children.map((category) => (
                    <div key={category.id}>{category.name}</div>
                  ))
                : categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.name}
                    </div>
                  ))}
            </Aside>
          </>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}

export default SideMenu
