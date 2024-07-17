import { FC } from "react"
import { Link, useParams } from "@tanstack/react-router"

type LocalLinkProps = {
  children: React.ReactNode
  to: string
}

const LocalLink: FC<LocalLinkProps> = ({ children, to, ...props }) => {
  const { countryCode } = useParams({ strict: false })

  const linkTo = `/${countryCode}${to === "/" ? "" : to}`

  return (
    <Link to={linkTo} {...props}>
      {children}
    </Link>
  )
}

export default LocalLink
