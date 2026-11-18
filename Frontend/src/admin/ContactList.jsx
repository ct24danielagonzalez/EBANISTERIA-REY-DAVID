
import { useEffect, useState } from 'react';
import { obtenerSolicitudes } from '../services/contactRequests.js';

export default function ContactList() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarSolicitudes() {
      try {
        const datos = await obtenerSolicitudes();
        setSolicitudes(datos);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las solicitudes.');
      } finally {
        setCargando(false);
      }
    }

    cargarSolicitudes();
  }, []);

  return (
    <section className="contact-admin">
      <h2>Solicitudes recibidas</h2>

      {cargando && <p>Cargando solicitudes...</p>}
      {error && <p role="alert">{error}</p>}

      {!cargando && !error && solicitudes.length === 0 && (
        <p>Todavía no hay solicitudes registradas.</p>
      )}

      <div className="contact-admin-grid">
        {solicitudes.map((solicitud) => (
          <article className="contact-admin-card" key={solicitud.id}>
            <h3>{solicitud.name}</h3>

            <p>
              <strong>Correo:</strong>{' '}
              <a href={`mailto:${solicitud.email}`}>
                {solicitud.email}
              </a>
            </p>

            <p>
              <strong>Servicio:</strong> {solicitud.service}
            </p>

            <p className="contact-admin-message">
              <strong>Mensaje:</strong> {solicitud.message}
            </p>

            <p className="contact-admin-date">
              {solicitud.createdAt?.toDate
                ? solicitud.createdAt.toDate().toLocaleString('es-PA')
                : 'Fecha no disponible'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
