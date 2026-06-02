import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from './App.jsx'

const paypalOptions = {
  clientId: "AdIucYj-WzdWXN-fW3dcIZGjaTl5oj4b0oK8YnWD1GwoBP35QRGtG4FQco4ep5i8eiimPrNwAITaE4yn", // Reemplazar con tu Client ID de PayPal Sandbox
  currency: "USD",
  intent: "capture"
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-tohysoy6fqmar1v7.us.auth0.com"
      clientId="5Kv0vRTwoYKaKFoJYDhDEvnj1DFHAFi4"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <PayPalScriptProvider options={paypalOptions}>
        <App />
      </PayPalScriptProvider>
    </Auth0Provider>
  </StrictMode>
)

