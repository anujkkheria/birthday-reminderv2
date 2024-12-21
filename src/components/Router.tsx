import Auth from './page/Auth/Auth'
import Login from './page/Auth/Login'
import Dashboard from './page/DashBoard/Dashboard'
import Signup from './page/Auth/Signup'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import AuthGuard from '../Utils/AuthGuard'
const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <Auth />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'Signup',
          element: <Signup />,
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <Dashboard />,
        </AuthGuard>
      ),
    },
    {
      path: '/',
      element: <Navigate to={'auth/login'} />,
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
