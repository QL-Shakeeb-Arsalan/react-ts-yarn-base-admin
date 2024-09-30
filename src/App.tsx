import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import RequiredAuth from './service/auth/RequiredAuth'
// Components imports
const Layout = lazy(() => import('./Layout/index'))
const Page404 = lazy(() => import('./pages/404'))

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

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
