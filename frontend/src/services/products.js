import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase.js';

export async function getProducts() {
  if (!db) return [];
  const snapshot = await getDocs(query(collection(db, 'productos'), orderBy('createdAt', 'desc')));
  return snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
}