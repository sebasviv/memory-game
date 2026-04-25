import { useAuth } from '../../hooks/context/AuthContext';
import './Header.scss';
import toast from 'react-hot-toast';
import logo from '../../assets/Rick_and_Morty_logo.svg';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    toast.success('Sesión cerrada');
    setTimeout(() => {
      logout();
    }, 300);
  }

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__title">Memory Game</span>
        <span className="app-header__subtitle">Bienvenido de nuevo</span>
      </div>

      <div className="app-header__logo-wrapper">
        <img src={logo} alt="Rick and Morty" className="app-header__logo" />
      </div>

      <div className="app-header__actions">
        <div className="app-header__user-info">
          <span className="app-header__label">Usuario</span>
          <span className="app-header__email">{user?.username ?? 'No definido'}</span>
        </div>

        <button type="button" className="app-header__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;