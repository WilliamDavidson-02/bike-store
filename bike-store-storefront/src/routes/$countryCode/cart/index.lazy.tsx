import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/$countryCode/cart/')({
  component: () => <div>Hello /$countryCode/cart/!</div>
})