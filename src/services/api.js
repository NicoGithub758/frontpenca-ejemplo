import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7230',
    headers: { 'Content-Type': 'application/json' }
});

// Interceptor para agregar el token JWT a todas las requests
apiClient.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

// --- AUTH ---

export const loginInterno = async (sitioSlug, email, password) => {
    return await apiClient.post('/api/auth/login-interno', {
        sitioSlug,
        email,
        password
    });
};

export const registrarUsuario = async (sitioSlug, nombre, email, password) => {
    return await apiClient.post('/api/auth/registrar', {
        sitioSlug,
        nombre,
        email,
        password
    });
};

export const loginSocial = async (auth0Token, sitioSlug) => {
    return await apiClient.post('/api/auth/login-social', {
        auth0Token,
        sitioSlug
    });
};

// --- PAGOS ---

export const crearOrdenPago = async (pencaInstanciaId) => {
    return await apiClient.post('/api/pagos/crear-orden', {
        pencaInstanciaId
    });
};

export const confirmarPago = async (pagoId, orderId) => {
    return await apiClient.post('/api/pagos/confirmar', {
        pagoId,
        orderId
    });
};

export const obtenerMisPagos = async () => {
    return await apiClient.get('/api/pagos/mis-pagos');
};

export default apiClient;