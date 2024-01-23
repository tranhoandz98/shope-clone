import { useRoutes } from 'react-router-dom'
import { routers } from './routers'

export default function useRouterElements() {
  const routeElements = useRoutes(routers)

  return routeElements
}
