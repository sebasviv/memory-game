import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/context/AuthContext';
import './LoginPage.scss';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Iniciar sesión</h1>
        <p className="login-subtitle">Accede para jugar memory-game.</p>

        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            login({ email });
            toast.success('Inicio de sesión exitoso');
            navigate('/home', { replace: true });
          }}
        >
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu-correo@ejemplo.com"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;