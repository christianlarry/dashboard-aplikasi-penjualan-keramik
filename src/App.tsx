// Import global/main CSS
import './styles/global.css'

import AppRouter from './routes/app-router'

// Context Provider
import { AuthProvider } from './contexts/auth-context'

// React Query Provider
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQuery'

const App = ()=>{
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
