import { ReactNode, lazy } from 'react'

export interface IRoutes {
  path: string
  element: ReactNode
  children?: IRoutes[]
}

const sliceOutLastPath = (path: string) => `/${path.split('/').filter(Boolean).slice(0, -1).join('/')}`

export function generateNestedRoutes(routes: IRoutes[]): IRoutes[] {
  for (const route of routes) {
    const { path } = route
    const nestedPath = sliceOutLastPath(path)
    const parentRouteIndex = routes.findIndex((r: IRoutes) => r.path === nestedPath)

    if (parentRouteIndex > -1) {
      routes[parentRouteIndex].children = [
        ...(routes[parentRouteIndex].children || []),
        {
          ...route,
          path: path.substring(path.lastIndexOf('/') + 1),
        },
      ]
      routes = routes.filter((r: IRoutes) => r.path !== path)
    }
  }

  return routes
}

export function generateRoutes() {
  const pages = import.meta.glob('../pages/**/*.tsx')
  const routes = []
  // eslint-disable-next-line sonarjs/slow-regex
  const catchRegex = /\[(.+)\]/g

  for (const path of Object.keys(pages)) {
    // @ts-expect-error Argument of type A is not assignable to type B.
    const Component = lazy(pages[path])
    let routePath = path.slice(8, -4)
    routePath = routePath.replace(catchRegex, ':$1')

    // handle index routes
    if (routePath.endsWith('/index')) {
      routePath = routePath.slice(0, -6) || '/'
    }

    const route = {
      element: <Component />,
      path: routePath,
    }

    routes.push(route)
  }

  // sort routes to ensure that parent routes are procesed before child routes
  routes.sort((a, b) => a.path.split('/').length - b.path.split('/').length)

  // create a nested structure
  return generateNestedRoutes(routes)
}
