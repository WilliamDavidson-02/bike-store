/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const CountryCodeIndexLazyImport = createFileRoute('/$countryCode/')()
const CountryCodeStoreIndexLazyImport = createFileRoute(
  '/$countryCode/store/',
)()
const CountryCodeCartIndexLazyImport = createFileRoute('/$countryCode/cart/')()
const CountryCodeAccountIndexLazyImport = createFileRoute(
  '/$countryCode/account/',
)()
const CountryCodeStoreCategoryIndexLazyImport = createFileRoute(
  '/$countryCode/store/$category/',
)()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const CountryCodeIndexLazyRoute = CountryCodeIndexLazyImport.update({
  path: '/$countryCode/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/$countryCode/index.lazy').then((d) => d.Route),
)

const CountryCodeStoreIndexLazyRoute = CountryCodeStoreIndexLazyImport.update({
  path: '/$countryCode/store/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/$countryCode/store/index.lazy').then((d) => d.Route),
)

const CountryCodeCartIndexLazyRoute = CountryCodeCartIndexLazyImport.update({
  path: '/$countryCode/cart/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/$countryCode/cart/index.lazy').then((d) => d.Route),
)

const CountryCodeAccountIndexLazyRoute =
  CountryCodeAccountIndexLazyImport.update({
    path: '/$countryCode/account/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/$countryCode/account/index.lazy').then((d) => d.Route),
  )

const CountryCodeStoreCategoryIndexLazyRoute =
  CountryCodeStoreCategoryIndexLazyImport.update({
    path: '/$countryCode/store/$category/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/$countryCode/store/$category/index.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/$countryCode/': {
      id: '/$countryCode/'
      path: '/$countryCode'
      fullPath: '/$countryCode'
      preLoaderRoute: typeof CountryCodeIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/$countryCode/account/': {
      id: '/$countryCode/account/'
      path: '/$countryCode/account'
      fullPath: '/$countryCode/account'
      preLoaderRoute: typeof CountryCodeAccountIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/$countryCode/cart/': {
      id: '/$countryCode/cart/'
      path: '/$countryCode/cart'
      fullPath: '/$countryCode/cart'
      preLoaderRoute: typeof CountryCodeCartIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/$countryCode/store/': {
      id: '/$countryCode/store/'
      path: '/$countryCode/store'
      fullPath: '/$countryCode/store'
      preLoaderRoute: typeof CountryCodeStoreIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/$countryCode/store/$category/': {
      id: '/$countryCode/store/$category/'
      path: '/$countryCode/store/$category'
      fullPath: '/$countryCode/store/$category'
      preLoaderRoute: typeof CountryCodeStoreCategoryIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  CountryCodeIndexLazyRoute,
  CountryCodeAccountIndexLazyRoute,
  CountryCodeCartIndexLazyRoute,
  CountryCodeStoreIndexLazyRoute,
  CountryCodeStoreCategoryIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$countryCode/",
        "/$countryCode/account/",
        "/$countryCode/cart/",
        "/$countryCode/store/",
        "/$countryCode/store/$category/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/$countryCode/": {
      "filePath": "$countryCode/index.lazy.tsx"
    },
    "/$countryCode/account/": {
      "filePath": "$countryCode/account/index.lazy.tsx"
    },
    "/$countryCode/cart/": {
      "filePath": "$countryCode/cart/index.lazy.tsx"
    },
    "/$countryCode/store/": {
      "filePath": "$countryCode/store/index.lazy.tsx"
    },
    "/$countryCode/store/$category/": {
      "filePath": "$countryCode/store/$category/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
