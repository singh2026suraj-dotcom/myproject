import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Usercontext } from './userContext'
import Nav from './component/Nav'
import Home from './component/home'
import Signin from './component/Signin'
import Signup from './component/Signup'
import Profile from './component/profile'
import ImageUpload from './component/ImageUpload'
import ViewImages from './component/ViewImage'
import ProtectedRoute from './component/ProtectedRoute'
import GuestRoute from './component/GuestRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'signin',
        element: (
          <GuestRoute>
            <Signin />
          </GuestRoute>
        ),
      },
      {
        path: 'signup',
        element: (
          <GuestRoute>
            <Signup />
          </GuestRoute>
        ),
      },
      {
        path: 'imageupload',
        element: (
          <ProtectedRoute>
            <ImageUpload />
          </ProtectedRoute>
        ),
      },
      {
        path: 'view',
        element: (
          <ProtectedRoute>
            <ViewImages />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

function App() {
  const [userdata, setUserdata] = useState('')

  return (
    <Usercontext.Provider value={[userdata, setUserdata]}>
      <RouterProvider router={router} />
    </Usercontext.Provider>
  )
}

export default App
