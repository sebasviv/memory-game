import { useState } from 'react'
import './App.scss'
import { useAuth } from './hooks/context/AuthContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import RegisterPage from './pages/register-page/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if(loading){
    return <div>Loading...</div>;
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
