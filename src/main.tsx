import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { AuthProvider } from './hooks/context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <App />
    </AuthProvider>
  </StrictMode>,
)
