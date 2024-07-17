import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/$countryCode/")({
  component: () => <div></div>,
})
