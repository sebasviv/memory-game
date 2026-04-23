import './App.scss'
import { useAuth } from './hooks/context/AuthContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import RegisterPage from './pages/register-page/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/home-page/HomePage';
import GamePage from './pages/Game/GamePage';
import Spinner from './components/spinner/Spinner';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if(loading){
    return <Spinner fullscreen message='Conectando sesión...' />;
  }

  return (
     <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace /> }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
