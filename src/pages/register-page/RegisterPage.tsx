/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/context/AuthContext';
import './RegisterPage.scss';
import toast from 'react-hot-toast';
import authService from '../../services/authService';
import Spinner from '../../components/spinner/Spinner';

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await authService.register(username, email, password);
      toast.success("Registro exitoso! Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error al registrarse. Por favor, inténtalo de nuevo.");
      toast.error(err.message || "Error al registrarse. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if(error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main className="register-page">
      <section className="register-card">
        <h1>Crear cuenta</h1>
        <p className="register-subtitle">Regístrate para empezar a jugar.</p>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Nombre de usuario</label>
          <input
            id="name"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Tu nombre"
            required
          />
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
      {isLoading && <Spinner message={'Cargando partida...'} fullscreen />}
    </main>
  );
};

export default RegisterPage;