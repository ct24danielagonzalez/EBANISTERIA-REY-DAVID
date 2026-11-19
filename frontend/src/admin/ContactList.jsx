import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../services/firebase.js';

export default function ContactList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  async function refresh() {
    setLoading(true);
    try {
      if (!db) throw new Error('Firebase no configurado');
      const snapshot = await getDocs(query(collection(db, 'solicitudes'), orderBy('createdAt', 'desc')));
      setItems(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
      setError('');
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las solicitudes. Revisa los permisos de Firebase.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function deleteRequest(item) {
    if (!db || deletingId) return;
    const confirmed = window.confirm(`¿Eliminar definitivamente la cotización de ${item.name || 'este cliente'}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    setDeletingId(item.id);
    setError('');
    setNotice('');
    try {
      await deleteDoc(doc(db, 'solicitudes', item.id));
      setItems((previous) => previous.filter((entry) => entry.id !== item.id));
      setNotice('Cotización eliminada correctamente.');
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar la cotización. Verifica los permisos del administrador.');
    } finally {
      setDeletingId(null);
    }
  }

  return <section className="contact-admin" aria-labelledby="contact-requests-title">
    <h2 id="contact-requests-title">Solicitudes de cotización</h2>
    <button type="button" onClick={refresh} disabled={loading || Boolean(deletingId)}>Actualizar solicitudes</button>
    {loading && <p role="status">Cargando solicitudes...</p>}
    {error && <p role="alert">{error}</p>}
    {notice && <p role="status">{notice}</p>}
    {!loading && !error && items.length === 0 && <p>Por ahora no hay solicitudes.</p>}
    <div className="contact-admin-grid">
      {items.map((item) => {
        const phone = String(item.phone || '').trim();
        const whatsappNumber = phone.replace(/\D/g, '');
        return <article className="contact-admin-card" key={item.id}>
          <h3>{item.name || 'Sin nombre'}</h3>
          <p><strong>Correo:</strong> <a href={`mailto:${item.email || ''}`}>{item.email || 'Sin correo'}</a></p>
          <p><strong>Teléfono:</strong> {phone ? <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a> : 'No registrado (solicitud anterior)'}</p>
          {whatsappNumber && <p><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">Contactar al cliente por WhatsApp</a></p>}
          <p><strong>Servicio:</strong> {item.service || 'No especificado'}</p>
          <p className="contact-admin-message">{item.message || 'Sin detalles'}</p>
          <p className="contact-admin-date">{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString('es-PA') : 'Fecha no disponible'}</p>
          <button className="contact-delete-button" type="button" disabled={Boolean(deletingId)} onClick={() => deleteRequest(item)}>
            {deletingId === item.id ? 'Eliminando...' : 'Eliminar cotización'}
          </button>
        </article>;
      })}
    </div>
  </section>;
}
