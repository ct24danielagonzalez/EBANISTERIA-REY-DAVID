
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase.js';

export default function ProjectGallery() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarProyectos() {
      if (!db) {
        setError('El catálogo no está disponible.');
        setCargando(false);
        return;
      }

      try {
        const resultado = await getDocs(
          collection(db, 'productos')
        );

        const datos = resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data()
        }));

        setProyectos(datos);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los proyectos.');
      } finally {
        setCargando(false);
      }
    }

    cargarProyectos();
  }, []);

  return (
    <section className="projects section" id="proyectos">
      <div className="section-heading">
        <div>
          <p className="eyebrow eyebrow-dark">PORTAFOLIO</p>
          <h2>
            Trabajos con identidad <em>propia.</em>
          </h2>
        </div>
        <p>
          Conoce algunos de nuestros proyectos realizados.
        </p>
      </div>

      {cargando && <p>Cargando proyectos...</p>}

      {error && <p role="alert">{error}</p>}

      {!cargando && !error && proyectos.length === 0 && (
        <div className="project-placeholder">
          <p>Próximamente compartiremos nuestros trabajos.</p>
        </div>
      )}

      <div className="public-project-grid">
        {proyectos.map((proyecto) => (
          <article
            className="public-project-card"
            key={proyecto.id}
          >
            {proyecto.imagen && (
              <img
                src={proyecto.imagen}
                alt={proyecto.nombre}
                loading="lazy"
              />
            )}

            <div className="public-project-content">
              <span>{proyecto.categoria}</span>
              <h3>{proyecto.nombre}</h3>
              <p>{proyecto.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
