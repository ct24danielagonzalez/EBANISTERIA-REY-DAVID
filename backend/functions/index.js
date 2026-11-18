import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';

initializeApp();

// Endpoint inicial de prueba. La integración con un proveedor de IA
// se agregará después mediante secretos del backend, nunca en el navegador.
export const health = onRequest({ cors: true }, (request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'Ebanistería Rey David API'
  });
});