import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PencasPage from './pages/PencasPage';
import PagarPencaPage from './pages/PagarPencaPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta dinámica para multitenancy */}
          <Route path="/:tenantSlug/login" element={<LoginPage />} />
          <Route path="/:tenantSlug/register" element={<RegisterPage />} />
          <Route path="/:tenantSlug/dashboard" element={<DashboardPage />} />
          <Route path="/:tenantSlug/pencas" element={<PencasPage />} />
          <Route path="/:tenantSlug/pagar/:pencaId" element={<PagarPencaPage />} />
    
          
          {/* Ruta por defecto si no ponen nada o ponen mal la URL */}
          <Route path="*" element={<h2 style={{textAlign:'center', marginTop: '50px'}}>Por favor, accede a través de la URL de tu organización (ej: /pepsi/login)</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;