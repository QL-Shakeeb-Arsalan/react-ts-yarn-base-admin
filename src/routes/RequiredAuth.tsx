import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/types/store'

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
