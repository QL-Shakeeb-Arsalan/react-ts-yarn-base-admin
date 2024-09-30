import { isRouteErrorResponse, Outlet, useRouteError } from 'react-router-dom'

export default function BlogPage() {
  return (
    <>
      <h1>Blog Page</h1> <Outlet />
    </>
  )
}

export function ErrorBoundary() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError()

  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText}
    </h1>
  ) : (
    <h1>{error.message || error}</h1>
  )
}

// If you want to customize the component display name in React dev tools:
ErrorBoundary.displayName = 'SampleErrorBoundary'
