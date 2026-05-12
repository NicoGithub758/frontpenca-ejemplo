import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';
import { loginInterno, loginSocial } from '../services/api';

const LoginPage = () => {
    const { tenantSlug } = useParams();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { loginWithPopup, getAccessTokenSilently } = useAuth0();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    // Login con email y password (interno)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const response = await loginInterno(tenantSlug, email, password);
            login(response.data);
            navigate(`/${tenantSlug}/dashboard`);
        } catch (err) {
            console.error("Error en login:", err);
            setError(err.response?.data || "Credenciales incorrectas o el sitio no existe.");
        } finally {
            setCargando(false);
        }
    };

    // Login con Google via Auth0
    const handleGoogleLogin = async () => {
        setError('');
        setCargando(true);

        try {
            // 1. Abrir popup de Google via Auth0
            await loginWithPopup({
                authorizationParams: {
                    connection: 'google-oauth2'
                }
            });

            // 2. Obtener el access token de Auth0
            const auth0Token = await getAccessTokenSilently();

            // 3. Enviar token a la API con el slug del sitio
            const response = await loginSocial(auth0Token, tenantSlug);

            // 4. Guardar sesión y navegar
            login(response.data);
            navigate(`/${tenantSlug}/dashboard`);
        } catch (err) {
            console.error("Error en login con Google:", err);
            if (err.message?.includes('popup')) {
                setError('El popup fue bloqueado. Permití popups para este sitio.');
            } else {
                setError(err.response?.data || 'No se pudo iniciar sesión con Google.');
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <div style={{
                border: '1px solid #ccc',
                padding: '30px',
                display: 'inline-block',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                minWidth: '320px'
            }}>
                <h2 style={{ color: '#007bff' }}>Penca: {tenantSlug?.toUpperCase()}</h2>
                <p>Ingresa tus credenciales</p>

                {/* Formulario de login interno */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
                        required
                    />

                    {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

                    <button
                        type="submit"
                        disabled={cargando}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: cargando ? '#ccc' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: cargando ? 'not-allowed' : 'pointer',
                            width: '270px'
                        }}
                    >
                        {cargando ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                {/* Separador */}
                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
                    <hr style={{ flex: 1, borderColor: '#eee' }} />
                    <span style={{ color: '#999', fontSize: '13px' }}>o continuá con</span>
                    <hr style={{ flex: 1, borderColor: '#eee' }} />
                </div>

                {/* Botón Google */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={cargando}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#fff',
                        color: '#333',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        cursor: cargando ? 'not-allowed' : 'pointer',
                        width: '270px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        fontSize: '15px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Continuar con Google
                </button>

                <p style={{ marginTop: '20px', fontSize: '14px' }}>
                    ¿No tienes cuenta? <Link to={`/${tenantSlug}/register`}>Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;