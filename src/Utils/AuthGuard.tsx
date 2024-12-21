import React, { ReactNode, useEffect } from 'react'
import { useContext } from 'react'
import { userContext } from '../context/user'
import { useNavigate } from 'react-router-dom'
interface IAuthGuard {
  children: ReactNode
}
const AuthGuard: React.FC<IAuthGuard> = ({ children }) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useContext(userContext)
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login', { replace: true })
    }
  }, [isLoggedIn])
  return children
}
export default AuthGuard
