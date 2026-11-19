import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../services/firebase.js';

export default function ContactList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  async function refresh() {
    setLoading(true);
    try {
      if (!db) throw new Error('Firebase no configurado');
      const snapshot = await getDocs(query(collection(db, 'solicitudes'), orderBy('createdAt', 'desc')));
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setError('');
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las solicitudes. Revisa los permisos de Firebase.');
    } finally { setLoading(false); }
  }
  useEffect(() => { refresh(); }, []);
  return <section className="contact-admin" aria-labelledby="contact-requests-title">
    <h2 id="contact-requests-title">Solicitudes de contacto</h2>
    <button type="button" onClick={refresh}>Actualizar solicitudes</button>
    {loading && <p role="status">Cargando solicitudes...</p>}
    {error && <p role="alert">{error}</p>}
    {!loading && !error && items.length === 0 && <p>Por ahora no hay solicitudes.</p>}
    <div className="contact-admin-grid">{items.map((item) => <article className="contact-admin-card" key={item.id}>
      <h3>{item.name || 'Sin nombre'}</h3>
      <p><strong>Correo:</strong> <a href={`mailto:${item.email || ''}`}>{item.email || 'Sin correo'}</a></p>
      <p><strong>Servicio:</strong> {item.service || 'No especificado'}</p>
      <p className="contact-admin-message">{item.message || 'Sin detalles'}</p>
      <p className="contact-admin-date">{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString('es-PA') : 'Fecha no disponible'}</p>
    </article>)}</div>
  </section>;
}
