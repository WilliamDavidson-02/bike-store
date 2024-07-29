import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/$countryCode/$category/')({
  component: () => <div>Hello /$countryCode/$category/!</div>
})