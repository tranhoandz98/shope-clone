import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { AppProvider } from './context/app.context'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function WrapApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } }
  })
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter basename='/shope-clone'>
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              <App />
            </AppProvider>
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  )
}

export default WrapApp
