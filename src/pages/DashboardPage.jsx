import { useAuth } from '../context/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { logout: auth0Logout } = useAuth0();
  const navigate = useNavigate();
  const { tenantSlug } = useParams();

  const handleLogout = () => {
    logout();
    auth0Logout({ 
        logoutParams: { 
            returnTo: `${window.location.origin}/${tenantSlug}/login`
        } 
    });
};

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>¡Bienvenido, {user?.usuario?.nombre || 'Usuario'}!</h2>
      <p>Sitio: {user?.usuario?.sitioNombre}</p>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default DashboardPage;