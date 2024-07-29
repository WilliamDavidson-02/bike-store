import { FC } from "react"
import { useEventListener } from "usehooks-ts"
import styled from "@emotion/styled"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { ProductCategory } from "@medusajs/medusa"
import { ChevronLeft } from "lucide-react"
import Box from "@components/common/Box"
import { Link, useParams } from "@tanstack/react-router"
import { GlobalParams } from "src/types/global"
import SideMenuCategoryTitle from "./SideMenuCategoryTitle"
import { css, useTheme } from "@emotion/react"

const Aside = styled(motion.aside)`
  position: fixed;
  inset: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
  padding: ${({ theme }) => theme.spacing.xl4};
  padding-top: ${({ theme }) =>
    `calc(${theme.spacing.xl5} + ${theme.spacing.xl4})`};
  z-index: 51;

  @media (min-width: 1024px) {
    height: fit-content;

    padding: ${({ theme }) => `${theme.spacing.xl6}`};
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

const StyledUl = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const StyledLi = styled(motion.li)`
  cursor: pointer;
  list-style-type: none;
  user-select: none;
`

const fadeVariant: Variants = {
  initial: { opacity: 0, x: "8px" },
  animate: { opacity: 1, x: "0px" },
  exit: { opacity: 0, x: "-8px" },
}

type SideMenuProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  categories: ProductCategory[]
  selectedCategory: ProductCategory[]
  setSelectedCategory: React.Dispatch<React.SetStateAction<ProductCategory[]>>
}

const SideMenu: FC<SideMenuProps> = ({
  isOpen,
  setIsOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const theme = useTheme()
  const { countryCode } = useParams({ strict: false }) as GlobalParams

  useEventListener(
    "keydown",
    ({ key }) => key === "Escape" && isOpen && setIsOpen(false),
  )

  const handleClose = () => {
    setIsOpen(false)
    setSelectedCategory([])
  }

  const handleBack = () => {
    setSelectedCategory(selectedCategory.splice(0, selectedCategory.length - 1))
  }

  const handleSelectCategory = (category: ProductCategory) => {
    const lastCategory = selectedCategory[selectedCategory.length - 1]

    if (lastCategory?.id === category.id) return
    if (!category.category_children.length) return

    setSelectedCategory((prev) => [...prev, category])
  }

  const getCategoryHref = (category: ProductCategory) => {
    let href = `/${countryCode}`

    selectedCategory.forEach((c) => (href = `${href}/${c.handle}`))

    href = `${href}/${category.handle}`

    return href
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Backdrop
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsOpen(false)}
          />
          <Aside
            initial={{ clipPath: "rect(0 100% 3rem 0)" }}
            animate={{ clipPath: "rect(0 100% 100% 0)" }}
            exit={{ clipPath: "rect(0 100% 3rem 0)" }}
            transition={{
              clipPath: {
                duration: 0.5,
                ease: [0.6, 0.18, 0.315, 0.905],
              },
            }}
            onMouseLeave={handleClose}
          >
            <StyledUl>
              <AnimatePresence mode="wait">
                {selectedCategory.length ? (
                  <>
                    {selectedCategory[
                      selectedCategory.length - 1
                    ].category_children.map((category) => (
                      <StyledLi
                        variants={fadeVariant}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
                        key={category.id}
                        onClick={() => handleSelectCategory(category)}
                      >
                        <SideMenuCategoryTitle>
                          {category.category_children.length ? (
                            <>{category.name}</>
                          ) : (
                            <Link
                              onClick={handleClose}
                              to={`${getCategoryHref(category)}`}
                            >
                              {category.name}
                            </Link>
                          )}
                        </SideMenuCategoryTitle>
                      </StyledLi>
                    ))}
                    <Box
                      variants={fadeVariant}
                      initial={"initial"}
                      animate={"animate"}
                      exit={"exit"}
                      component={motion.div}
                      onClick={handleBack}
                      css={css`
                        position: absolute;
                        top: 4px;
                        left: 4px;
                        padding: ${theme.spacing.lg};
                        cursor: pointer;

                        @media (min-width: 1024px) {
                          display: none;
                        }
                      `}
                    >
                      <ChevronLeft />
                    </Box>
                  </>
                ) : (
                  <>
                    {categories.map((category) => (
                      <StyledLi
                        variants={fadeVariant}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
                        key={category.id}
                        onClick={() => handleSelectCategory(category)}
                      >
                        <SideMenuCategoryTitle>
                          {category.category_children.length ? (
                            <>{category.name}</>
                          ) : (
                            <Link
                              onClick={handleClose}
                              to={`${getCategoryHref(category)}`}
                            >
                              {category.name}
                            </Link>
                          )}
                        </SideMenuCategoryTitle>
                      </StyledLi>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </StyledUl>
          </Aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default SideMenu
