import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7230', // La URL de tu API .NET
    headers: { 'Content-Type': 'application/json' }
});

// Función para el login interno
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

// Login social con Google via Auth0
export const loginSocial = async (auth0Token, sitioSlug) => {
    return await apiClient.post('/api/auth/login-social', {
        auth0Token,
        sitioSlug
    });
};

export default apiClient;