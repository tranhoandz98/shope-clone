import { useContext, useEffect } from 'react'
import AppRouter from './routers/AppRouter'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './context/app.context'

function App() {
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
