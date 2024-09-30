import { useRouteError } from 'react-router-dom'

const Page404 = () => {
  const error = useRouteError()
  console.log({ error })

  return <div>404</div>
}

export default Page404
