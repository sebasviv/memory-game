/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/context/AuthContext';
import './LoginPage.scss';
import toast from 'react-hot-toast';
import authService from '../../services/authService';
import Spinner from '../../components/spinner/Spinner';


const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { token, user } = await authService.login(email, password);
      login(user, token);
      toast.success("Inicio de sesión exitoso! Redirigiendo...");
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.");
      toast.error(err.message || "Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.");
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
    <main className="login-page">
      <section className="login-card">
        <h1>Iniciar sesión</h1>
        <p className="login-subtitle">Accede para jugar memory-game.</p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
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
      {isLoading && <Spinner message={'Cargando partida...'} fullscreen />}
    </main>
  );
};

export default LoginPage;