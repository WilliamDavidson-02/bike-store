import { useContext } from "react"
import { DropDownContext } from "@components/common/DropDown"

const useDropDownContext = () => {
  const context = useContext(DropDownContext)

  if (!context) {
    throw new Error(
      "DropDownContext must be used inside of a DropDownContext Provider!",
    )
  }

  return context
}

export default useDropDownContext
