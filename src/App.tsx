// Import global/main CSS
import './styles/global.css'

import AppRouter from './routes/app-router'

// Context Provider
import { AuthProvider } from './contexts/auth-context'

const App = ()=>{
  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  )
}

export default App
