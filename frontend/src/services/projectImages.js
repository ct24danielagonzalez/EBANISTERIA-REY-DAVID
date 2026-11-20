import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, storage } from './firebase.js';

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

export async function subirImagenProyecto(file) {
  if (!auth?.currentUser) throw new Error('Debes iniciar sesión como administrador.');
  if (!storage) throw new Error('Firebase Storage no está configurado.');
  if (!file || !IMAGE_TYPES.has(file.type)) throw new Error('Selecciona una imagen JPG, PNG, WebP o AVIF.');
  if (file.size > MAX_IMAGE_SIZE) throw new Error('La imagen debe pesar como máximo 8 MB.');

  const extension = {
    'image/jpeg': 'jpg', 'image/png': 'png',
    'image/webp': 'webp', 'image/avif': 'avif'
  }[file.type];
  const id = crypto.randomUUID();
  const fileRef = ref(storage, 'proyectos/' + id + '.' + extension);
  await uploadBytes(fileRef, file, { contentType: file.type });
  try {
    return await getDownloadURL(fileRef);
  } catch (error) {
    await deleteObject(fileRef).catch(() => {});
    throw error;
  }
}
