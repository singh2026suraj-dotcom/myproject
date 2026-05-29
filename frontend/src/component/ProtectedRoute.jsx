import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Usercontext } from '../userContext'

export function isLoggedIn(userdata) {
  return Boolean(
    userdata &&
      typeof userdata === 'object' &&
      (userdata.email || userdata.name)
  )
}

export default function ProtectedRoute({ children }) {
  const [userdata] = useContext(Usercontext)
  const location = useLocation()

  if (!isLoggedIn(userdata)) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }

  return children
}
