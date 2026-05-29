import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Usercontext } from '../userContext'
import { isLoggedIn } from './ProtectedRoute'

export default function GuestRoute({ children }) {
  const [userdata] = useContext(Usercontext)

  if (isLoggedIn(userdata)) {
    return <Navigate to="/" replace />
  }

  return children
}
