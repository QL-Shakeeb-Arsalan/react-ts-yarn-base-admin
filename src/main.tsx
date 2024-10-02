import { Suspense, startTransition } from 'react'
import { createRoot } from 'react-dom/client'

import FileRouter from './components/file-router'
import './index.css'

const root = document.getElementById('root')!

startTransition(() => {
  createRoot(root).render(
    <Suspense fallback={<div>Loading...</div>}>
      <FileRouter />
    </Suspense>
  )
})
