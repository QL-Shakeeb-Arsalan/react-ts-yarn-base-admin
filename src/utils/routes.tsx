import { ReactNode, lazy } from 'react'

export interface IRoutes {
  path: string
  element: ReactNode
  children?: IRoutes[]
}

const sliceOutLastPath = (path: string) => `/${path.split('/').filter(Boolean).slice(0, -1).join('/')}`

function getParentRouteIndex(path: string, routes: IRoutes[]) {
  const nestedPath = sliceOutLastPath(path)
  const parentRouteIndex = routes.findIndex((r: IRoutes) => r.path === nestedPath)

  if (parentRouteIndex > -1 && path !== '/') {
    return parentRouteIndex
  } else {
    return getParentRouteIndex(nestedPath, routes)
  }
}

export function generateNestedRoutes(routes: IRoutes[]): IRoutes[] {
  for (const route of routes) {
    const { path } = route

    if (path !== '/') {
      const parentRouteIndex = getParentRouteIndex(path, routes)
      const children = routes[parentRouteIndex].children
      const parentPath = routes[parentRouteIndex].path

      // Add a children in a route
      routes[parentRouteIndex].children = [
        ...(children || []),
        {
          ...route,
          // Remove parent route pathname  /blog/:id => :id
          path: path.replace(parentPath === '/' ? '/' : `${parentPath}/`, ''),
        },
      ]
      routes = routes.filter(r => r.path !== path && path !== '/')
    }
  }

  return routes
}

export function generateRoutes() {
  const pages = import.meta.glob('../pages/**/*.tsx')
  const routes: IRoutes[] = []
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

    const route: IRoutes = {
      element: <Component />,
      path: routePath,
    }

    routes.push(route)
  }

  // sort routes to ensure that parent routes are procesed before child routes
  routes.sort((a, b) => b.path.split('/').length - a.path.split('/').length)

  // create a nested structure
  return generateNestedRoutes(routes)
}
