import { useContext } from 'react'
import { AuthContext, AuthContextType } from './AuthProvider'
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    return { isAuthenticated: false } as AuthContextType
  }

  return context
}
