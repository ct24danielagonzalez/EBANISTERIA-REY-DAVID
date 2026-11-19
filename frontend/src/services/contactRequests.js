import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase.js';

export async function guardarSolicitud(data) {
  if (!db) throw new Error('Firebase no está configurado.');
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const service = String(data.service || '').trim();
  const message = String(data.message || '').trim();
  if (!name || !email || !service || message.length < 10) {
    throw new Error('Completa los campos obligatorios.');
  }
  return addDoc(collection(db, 'solicitudes'), {
    name: name.slice(0, 120),
    email: email.slice(0, 254),
    service: service.slice(0, 120),
    message: message.slice(0, 2000),
    status: 'nuevo',
    createdAt: serverTimestamp()
  });
}
