import { type JSX, memo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { generateRoutes, IRoutes } from '../../utils/routes'

function FileRouter(): JSX.Element {
  const routes: IRoutes[] = generateRoutes()
  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />
}

export default memo(FileRouter)
