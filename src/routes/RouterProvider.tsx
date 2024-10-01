import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RequiredAuth from './RequiredAuth'
import { lazy } from 'react'
// Components imports
const Layout = lazy(() => import('../Layout'))
const Page404 = lazy(() => import('../pages/404'))

// Router
const router = createBrowserRouter([
  { path: '/login', element: <div>Login</div> },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <RequiredAuth>
            <div>Dashboard</div>,
          </RequiredAuth>
        ),
      },
      {
        path: 'blog',
        element: <div>Blog</div>,
      },
      {
        path: 'posts',
        element: <div>Posts</div>,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
