
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
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


export async function obtenerProyectos() {
  if (!db || !auth?.currentUser) {
    throw new Error('Debes iniciar sesión.');
  }

  const resultado = await getDocs(
    collection(db, 'productos')
  );

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }));
}

export async function eliminarProyecto(id) {
  if (!db || !auth?.currentUser) {
    throw new Error('Debes iniciar sesión.');
  }

  if (!id) {
    throw new Error('El proyecto no tiene un ID válido.');
  }

  await deleteDoc(doc(db, 'productos', id));
}


export async function actualizarProyecto(id, proyecto) {
  if (!db || !auth?.currentUser) {
    throw new Error('Debes iniciar sesión.');
  }

  if (!id) {
    throw new Error('El proyecto no tiene un ID válido.');
  }

  const nombre = proyecto.nombre.trim();
  const descripcion = proyecto.descripcion.trim();

  if (!nombre || !descripcion) {
    throw new Error('Nombre y descripción obligatorios.');
  }

  await updateDoc(doc(db, 'productos', id), {
    nombre,
    descripcion,
    categoria: proyecto.categoria,
    imagen: proyecto.imagen.trim()
  });
}

