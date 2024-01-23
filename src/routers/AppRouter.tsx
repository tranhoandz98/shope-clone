import useRouterElements from './useRouterElements'

export default function AppRouter() {
  const routerElements = useRouterElements()
  return <div>{routerElements}</div>
}
