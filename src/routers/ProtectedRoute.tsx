import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { routerMain } from '~/constants/routerMain'
import { AppContext } from '~/context/app.context'

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to={routerMain.LOGIN} />
}
