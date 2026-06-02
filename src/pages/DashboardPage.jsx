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
      
      <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          onClick={() => navigate(`/${tenantSlug}/pencas`)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Ver Pencas Disponibles
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: '12px 24px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;