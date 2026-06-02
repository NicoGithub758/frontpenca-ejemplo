import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { crearOrdenPago, confirmarPago } from '../services/api';

const PagarPencaPage = () => {
    const { tenantSlug, pencaId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [procesando, setProcesando] = useState(false);
    const [pagoIdTemp, setPagoIdTemp] = useState(null);

    // Este método se llama cuando el usuario hace clic en el botón de PayPal
    const crearOrden = async () => {
        try {
            setProcesando(true);
            setError('');

            // Llamar a la API para crear la orden de pago
            const response = await crearOrdenPago(parseInt(pencaId));
            const { orderId, pagoId } = response.data;

            // Guardar el pagoId para usarlo en la confirmación
            setPagoIdTemp(pagoId);

            return orderId; // PayPal espera que devolvamos el Order ID
        } catch (err) {
            console.error('Error al crear orden:', err);
            setError(err.response?.data || 'No se pudo crear la orden de pago.');
            setProcesando(false);
            throw err;
        }
    };

    // Este método se llama cuando el usuario aprueba el pago en PayPal
    const aprobarPago = async (data) => {
        try {
            setProcesando(true);

            // Confirmar el pago en nuestra API
            const response = await confirmarPago(pagoIdTemp, data.orderID);

            alert('¡Pago confirmado! Ya podés hacer tus predicciones.');
            navigate(`/${tenantSlug}/dashboard`);
        } catch (err) {
            console.error('Error al confirmar pago:', err);
            setError(err.response?.data?.mensaje || 'No se pudo confirmar el pago.');
            setProcesando(false);
        }
    };

    // Este método se llama si el usuario cancela el pago
    const cancelarPago = () => {
        setError('Pago cancelado. Podés intentar de nuevo cuando quieras.');
        setProcesando(false);
    };

    // Este método se llama si hay un error en PayPal
    const errorPago = (err) => {
        console.error('Error de PayPal:', err);
        setError('Hubo un error con PayPal. Intentá de nuevo.');
        setProcesando(false);
    };

    return (
        <div style={{ padding: '50px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '30px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff'
            }}>
                <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '10px' }}>
                    Pagar Participación
                </h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                    Mundial FIFA 2026 - $10.00 USD
                </p>

                {error && (
                    <div style={{
                        padding: '15px',
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        border: '1px solid #f5c6cb'
                    }}>
                        {error}
                    </div>
                )}

                {procesando && (
                    <p style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>
                        Procesando pago...
                    </p>
                )}

                {/* Botones de PayPal */}
                <div style={{ marginBottom: '20px' }}>
                    <PayPalButtons
                        style={{ layout: 'vertical', label: 'pay' }}
                        createOrder={crearOrden}
                        onApprove={aprobarPago}
                        onCancel={cancelarPago}
                        onError={errorPago}
                        disabled={procesando}
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={() => navigate(`/${tenantSlug}/pencas`)}
                        disabled={procesando}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: procesando ? 'not-allowed' : 'pointer',
                            opacity: procesando ? 0.6 : 1
                        }}
                    >
                        Volver a Pencas
                    </button>
                </div>

                <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', marginTop: '20px' }}>
                    Pagos procesados de forma segura por PayPal
                </p>
            </div>
        </div>
    );
};

export default PagarPencaPage;