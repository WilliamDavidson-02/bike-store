import Button, { ButtonProps } from "@components/common/Button"
import Typography from "@components/common/Typography"
import { css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react"
import { FC } from "react"
import { useWindowSize } from "usehooks-ts"

const TriggerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 50px;
  height: 50px;
`

export const PaginationTrigger: FC<
  ButtonProps & { p: number; currentPage?: number }
> = ({ children, variant = "neutral", p, currentPage, ...props }) => {
  const { countryCode } = useParams({ from: "/$countryCode/store/" })
  const navigate = useNavigate({ from: "/$countryCode/store" })
  const searchParams = useSearch({ from: "/$countryCode/store/" }) as any
  const theme = useTheme()

  const handlePageChange = (newPage: number) => {
    let params = searchParams
    params.page = newPage

    navigate({
      to: "/$countryCode/store",
      params: { countryCode },
      search: params,
    })
  }
  return (
    <Button
      onClick={() => handlePageChange(p)}
      variant={variant}
      css={css`
        ${p === currentPage &&
        css`
          background-color: ${theme.colors.button.bgUiButtonNeutralHover};
        `}
        ${TriggerCss}
      `}
      {...props}
    >
      {children}
    </Button>
  )
}

export const PaginationEllipsis = () => {
  return (
    <Button
      variant="ghost"
      as={"div"}
      css={css`
        cursor: default;
        ${TriggerCss}
      `}
    >
      <Ellipsis />
    </Button>
  )
}

type PaginationProps = {
  page: number
  totalPages: number
}

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl6} 0;
  width: 100%;
`

const Pagination: FC<PaginationProps> = ({ page, totalPages }) => {
  const size = useWindowSize()

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) => {
    return Array.from({ length: stop - start + 1 }).map((_, i) => start + i)
  }

  return (
    <Container>
      <PaginationTrigger
        p={page - 1}
        disabled={page <= 1}
        variant="interactive"
      >
        <ChevronLeft />
      </PaginationTrigger>

      {size.width >= 600 ? (
        totalPages <= 7 ? (
          arrayRange(1, totalPages).map((p) => (
            <PaginationTrigger currentPage={page} p={p} key={p}>
              {p}
            </PaginationTrigger>
          ))
        ) : page <= 4 ? (
          <>
            {arrayRange(1, 5).map((p) => (
              <PaginationTrigger currentPage={page} p={p} key={p}>
                {p}
              </PaginationTrigger>
            ))}
            <PaginationEllipsis />
            <PaginationTrigger currentPage={page} p={totalPages}>
              {totalPages}
            </PaginationTrigger>
          </>
        ) : page >= totalPages - 3 ? (
          <>
            <PaginationTrigger currentPage={page} p={1}>
              1
            </PaginationTrigger>
            <PaginationEllipsis />
            {arrayRange(totalPages - 4, totalPages).map((p) => (
              <PaginationTrigger currentPage={page} p={p} key={p}>
                {p}
              </PaginationTrigger>
            ))}
          </>
        ) : (
          <>
            <PaginationTrigger currentPage={page} p={1}>
              1
            </PaginationTrigger>
            <PaginationEllipsis />
            {arrayRange(page - 1, page + 1).map((p) => (
              <PaginationTrigger currentPage={page} p={p} key={p}>
                {p}
              </PaginationTrigger>
            ))}
            <PaginationEllipsis />
            <PaginationTrigger currentPage={page} p={totalPages}>
              {totalPages}
            </PaginationTrigger>
          </>
        )
      ) : (
        <Typography css={TriggerCss}>{`${page}/${totalPages}`}</Typography>
      )}

      <PaginationTrigger
        p={page + 1}
        disabled={page === totalPages}
        variant="interactive"
      >
        <ChevronRight />
      </PaginationTrigger>
    </Container>
  )
}

export default Pagination
