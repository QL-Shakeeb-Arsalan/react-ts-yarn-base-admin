import { isRouteErrorResponse, json, useLoaderData, useRouteError } from 'react-router-dom'

export function loader() {
  return json('Tanmay')
}

export default function IndePage() {
  const loaderData = useLoaderData()

  return (
    <>
      <h1>Index Page</h1>
      <p>Hi {loaderData || ''}</p>
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
ErrorBoundary.displayName = 'IndexErrorBoundary'
