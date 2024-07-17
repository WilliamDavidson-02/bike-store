import { createLazyFileRoute, Navigate } from "@tanstack/react-router"

const countryCode = import.meta.env.VITE_DEFAULT_REGION ?? "us"

const Home = () => {
  return <Navigate to="/$countryCode" params={{ countryCode }} />
}

export const Route = createLazyFileRoute("/")({
  component: Home,
})
