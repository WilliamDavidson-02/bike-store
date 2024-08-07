import Typography from "@components/common/Typography"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { ChevronRight } from "lucide-react"
import React, { FC, HTMLAttributes } from "react"

/**
 * Breadcrumb separator
 */

const Separator = styled.div`
  color: ${({ theme }) => theme.colors.foreground.textUiFgMuted};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BreadcrumbSeparator = () => {
  return (
    <Separator>
      <ChevronRight />
    </Separator>
  )
}

/**
 * Breadcrumb item
 */

const Item = styled.div<{ isPage: boolean }>`
  color: ${({ theme, isPage }) =>
    isPage
      ? theme.colors.foreground.textUiFgBase
      : theme.colors.foreground.textUiFgMuted};

  @media (pointer: fine) {
    ${({ theme, isPage }) =>
      !isPage &&
      css`
        &:hover {
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: ${theme.spacing.xs};
        }
      `}
  }
`

type BreadcrumbItemProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  isPage: boolean
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  children,
  isPage,
}) => {
  return (
    <Item isPage={isPage}>
      <Typography variant="body2">{children}</Typography>
    </Item>
  )
}

/**
 * Breadcrumb container
 */

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  user-select: none;
`

type BreadcrumbProps = {
  children: React.ReactNode
}

const Breadcrumb: FC<BreadcrumbProps> = ({ children }) => {
  return <Container>{children}</Container>
}

export default Breadcrumb
