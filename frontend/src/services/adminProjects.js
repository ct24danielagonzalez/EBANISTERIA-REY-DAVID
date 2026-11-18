
import {
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

import { auth, db } from './firebase.js';

export async function crearProyecto(proyecto) {
  if (!db || !auth?.currentUser) {
    throw new Error('Debes iniciar sesión.');
  }

  const nombre = proyecto.nombre.trim();
  const descripcion = proyecto.descripcion.trim();

  if (!nombre || !descripcion) {
    throw new Error('Nombre y descripción obligatorios.');
  }

  const nuevoProyecto = {
    nombre,
    descripcion,
    categoria: proyecto.categoria,
    imagen: proyecto.imagen.trim(),
    fechaCreacion: serverTimestamp()
  };

  const documento = await addDoc(
    collection(db, 'productos'),
    nuevoProyecto
  );

  return documento.id;
}
