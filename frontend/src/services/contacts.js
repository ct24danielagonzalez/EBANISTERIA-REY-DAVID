import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase.js';

export async function createContactRequest(data) {
  if (!db) throw new Error('Firebase aún no está configurado.');
  return addDoc(collection(db, 'solicitudes'), {
    ...data,
    status: 'nuevo',
    createdAt: new Date()
  });
}