import { combinedRef } from "@lib/hooks/useMultipleRefs"
import { mergeReactProps } from "@lib/utils"
import React, { forwardRef } from "react"

type SlotProps = {
  children: React.ReactNode
}

const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (!React.isValidElement(children)) return null

    return React.cloneElement(children, {
      ...mergeReactProps(props, children.props),
      ref: combinedRef([ref, (children as any).ref]),
    } as any)
  },
)

export default Slot
