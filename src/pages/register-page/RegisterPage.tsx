import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/context/AuthContext';
import './RegisterPage.scss';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <h1>Crear cuenta</h1>
        <p className="register-subtitle">Regístrate para empezar a jugar.</p>

        <form
          className="register-form"
          onSubmit={(event) => {
            event.preventDefault();
            login({ name, email });
            toast.success('Registro exitoso');
            navigate('/home', { replace: true });
          }}
        >
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre"
            required
          />

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

          <button type="submit">Registrarme</button>
        </form>

        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;