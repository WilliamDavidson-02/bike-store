import { FC } from "react"
import { useEventListener } from "usehooks-ts"
import styled from "@emotion/styled"
import { AnimatePresence, motion } from "framer-motion"
import { Link, useParams } from "@tanstack/react-router"
import { GlobalParams } from "src/types/global"
import Typography from "@components/common/Typography"
import Box from "@components/common/Box"
import CountryList from "./CountryList"
import { css, useTheme } from "@emotion/react"
import { navRoutes } from "@lib/routes"

const Aside = styled(motion.aside)`
  position: fixed;
  inset: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.bgUiBgBase};
  padding: ${({ theme }) => theme.spacing.xl4};
  padding-top: ${({ theme }) =>
    `calc(${theme.spacing.xl5} + ${theme.spacing.xl4})`};
  z-index: 51;
`

const Ul = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  height: 100%;
`

const Li = styled(motion.ul)`
  text-align: end;
  list-style: none;

  & > a {
    width: 100%;
    display: block;
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
}

const SideMenu: FC<SideMenuProps> = ({ isOpen, setIsOpen }) => {
  const { countryCode } = useParams({ strict: false }) as GlobalParams
  const theme = useTheme()

  useEventListener(
    "keydown",
    ({ key }) => key === "Escape" && isOpen && setIsOpen(false),
  )

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
          >
            <Ul>
              {navRoutes.map(({ route, title }) => (
                <Li key={title} onClick={() => setIsOpen(false)}>
                  <Link to={`/$countryCode${route}`} params={{ countryCode }}>
                    <Typography variant="h4" component="p">
                      {title}
                    </Typography>
                  </Link>
                </Li>
              ))}
            </Ul>
            <Box
              css={css`
                position: fixed;
                top: 0;
                left: ${theme.spacing.xl2};
              `}
            >
              <CountryList />
            </Box>
          </Aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default SideMenu
