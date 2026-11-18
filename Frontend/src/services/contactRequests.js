
import {
  addDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore';

import { db } from './firebase.js';

export async function guardarSolicitud(datos) {
  if (!db) {
    throw new Error('Firebase no está configurado.');
  }

  const solicitud = {
    name: datos.name.trim(),
    email: datos.email.trim(),
    service: datos.service.trim(),
    message: datos.message.trim(),
    createdAt: serverTimestamp()
  };

  if (
    !solicitud.name ||
    !solicitud.email ||
    !solicitud.service ||
    !solicitud.message
  ) {
    throw new Error('Completa los campos obligatorios.');
  }

  if (
    solicitud.name.length > 100 ||
    solicitud.email.length > 254 ||
    solicitud.service.length > 100 ||
    solicitud.message.length > 2000
  ) {
    throw new Error('Uno de los campos supera el límite permitido.');
  }

  const referencia = await addDoc(
    collection(db, 'solicitudes'),
    solicitud
  );

  return referencia.id;
}


import { getDocs, query } from 'firebase/firestore';
import { auth } from './firebase.js';

export async function obtenerSolicitudes() {
  if (!db || !auth?.currentUser) {
    throw new Error('Debes iniciar sesión.');
  }

  const consulta = query(collection(db, 'solicitudes'));
  const resultado = await getDocs(consulta);

  return resultado.docs
    .map((documento) => ({
      id: documento.id,
      ...documento.data()
    }))
    .sort((a, b) => {
      const fechaA = a.createdAt?.toMillis?.() ?? 0;
      const fechaB = b.createdAt?.toMillis?.() ?? 0;
      return fechaB - fechaA;
    });
}
