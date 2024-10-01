import { Suspense } from 'react'
import Router from './routes/RouterProvider'

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <Router />
    </Suspense>
  )
}

export default App
