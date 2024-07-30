import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/$countryCode/store/')({
  component: () => <div>Hello /$countryCode/store/!</div>
})