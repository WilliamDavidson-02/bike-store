import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/$countryCode/account/')({
  component: () => <div>Hello /$countryCode/account/!</div>
})