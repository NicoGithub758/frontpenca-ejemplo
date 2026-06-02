import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../services/api';

const PencasPage = () => {
    const { tenantSlug } = useParams();
    const navigate = useNavigate();
    const [pencas, setPencas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarPencas();
    }, []);

    const cargarPencas = async () => {
        try {
            // TODO: Crear endpoint en la API para listar pencas por sitio
            // Por ahora simulamos con datos estáticos
            const pencasEjemplo = [
                {
                    id: 1,
                    nombre: 'Mundial FIFA 2026',
                    costo: 10.00,
                    descripcion: 'Predecí los resultados del Mundial 2026'
                }
            ];
            setPencas(pencasEjemplo);
            setCargando(false);
        } catch (err) {
            setError('No se pudieron cargar las pencas.');
            setCargando(false);
        }
    };

    const handlePagar = (pencaId) => {
        navigate(`/${tenantSlug}/pagar/${pencaId}`);
    };

    if (cargando) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando pencas...</p>;

    return (
        <div style={{ padding: '50px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#007bff' }}>Pencas Disponibles</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                Elegí una penca para participar
            </p>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <div style={{ display: 'grid', gap: '20px' }}>
                {pencas.map((penca) => (
                    <div
                        key={penca.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            padding: '20px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{penca.nombre}</h3>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                            {penca.descripcion}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
                                ${penca.costo.toFixed(2)} USD
                            </span>
                            <button
                                onClick={() => handlePagar(penca.id)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '15px'
                                }}
                            >
                                Participar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button
                    onClick={() => navigate(`/${tenantSlug}/dashboard`)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Volver al Dashboard
                </button>
            </div>
        </div>
    );
};

export default PencasPage;