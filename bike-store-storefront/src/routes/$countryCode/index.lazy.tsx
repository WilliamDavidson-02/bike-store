import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/$countryCode/")({
  component: () => <section></section>,
})
