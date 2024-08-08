import { FC } from "react"
import styled from "@emotion/styled"
import Button from "@components/common/Button"
import { Save, Settings2 } from "lucide-react"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/common/Sheet"
import { css, useTheme } from "@emotion/react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type RefinementListProps = {
  options?: SortOptions
}

const Container = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.xl6};

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) =>
      theme.colors.border.borderUiBorderStrong};
  }

  &::before {
    inset: 0;
  }

  &::after {
    bottom: 0;
    left: 0;
  }
`

const RefinementList: FC<RefinementListProps> = () => {
  const theme = useTheme()

  return (
    <Sheet>
      <Container>
        <SheetTrigger>
          <Button
            variant="ghost"
            css={css`
              display: flex;
              align-items: center;
              gap: ${theme.spacing.lg};
            `}
          >
            <Settings2 />
            <span>SHOW FILTERS</span>
          </Button>
        </SheetTrigger>
      </Container>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <div>Price</div>
          <div>Colors</div>
          <div>Order</div>
          <div>In Stock</div>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: ${theme.spacing.lg};
              `}
            >
              <Save />
              <span>Save</span>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default RefinementList
