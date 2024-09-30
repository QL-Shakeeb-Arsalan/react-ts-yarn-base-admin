import { createContext, useState } from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
  login: (callback: VoidFunction) => void
  logout: (callback: VoidFunction) => void
}
export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => {
    setIsAuthenticated(true)
  }
  const logout = () => {
    setIsAuthenticated(false)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
