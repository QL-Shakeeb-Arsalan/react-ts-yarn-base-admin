import { Suspense, startTransition } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { generateRoutes, IRoutes } from './utils/routes'
import './index.css'

const routes: IRoutes[] = generateRoutes()
const router = createBrowserRouter(routes)

const root = document.getElementById('root')!

startTransition(() => {
  createRoot(root).render(
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
})
