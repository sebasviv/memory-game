import { useAuth } from '../../hooks/context/AuthContext';
import AppLayout from '../layout/AppLayout';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const ProtectedRoute = () => {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Spinner fullscreen message='Verificando acceso...' />
    }


    return isAuthenticated ? (
        <AppLayout>
            <Outlet />
        </AppLayout>
    ) : (
        <Navigate to="/login" replace />
    )
}

export default ProtectedRoute