import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { registrarUsuario } from '../services/api';

const RegisterPage = () => {
    const { tenantSlug } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registrarUsuario(tenantSlug, formData.nombre, formData.email, formData.password);
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            navigate(`/${tenantSlug}/login`);
        } catch (err) {
            setError(err.response?.data || "Error al registrarse.");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <div style={{ border: '1px solid #ccc', padding: '30px', display: 'inline-block', borderRadius: '10px' }}>
                <h2 style={{ color: '#28a745' }}>Registro: {tenantSlug?.toUpperCase()}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre completo" required
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }} 
                    />
                    <input type="email" placeholder="Email" required
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }} 
                    />
                    <input type="password" placeholder="Contraseña" required
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }} 
                    />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Registrarse
                    </button>
                </form>
                <p><Link to={`/${tenantSlug}/login`}>¿Ya tienes cuenta? Entra aquí</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;