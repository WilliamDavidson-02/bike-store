import { FC } from "react"
import styled from "@emotion/styled"

const Main = styled.main`
  min-height: calc(100vh - 3rem);
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  padding: ${({ theme }) => theme.spacing.xl2};

  @media (min-width: 1024px) {
    padding: ${({ theme }) => theme.spacing.xl3};
  }
`

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <Main>{children}</Main>
}

export default MainLayout
