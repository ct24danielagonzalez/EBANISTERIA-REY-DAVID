import { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { db } from '../services/firebase.js';

export default function ProjectGallery() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const carruselRef = useRef(null);

  useEffect(() => {
    let activo = true;
    async function cargarProyectos() {
      if (!db) {
        if (activo) { setError('El catálogo no está disponible.'); setCargando(false); }
        return;
      }
      try {
        const resultado = await getDocs(collection(db, 'productos'));
        const datos = resultado.docs.map((documento) => ({ id: documento.id, ...documento.data() }));
        if (activo) setProyectos(datos);
      } catch (err) {
        console.error(err);
        if (activo) setError('No se pudieron cargar los proyectos.');
      } finally {
        if (activo) setCargando(false);
      }
    }
    cargarProyectos();
    return () => { activo = false; };
  }, []);

  function desplazar(direccion) {
    const carrusel = carruselRef.current;
    if (!carrusel) return;
    const tarjeta = carrusel.querySelector('.public-project-card');
    const distancia = tarjeta ? tarjeta.getBoundingClientRect().width + 20 : carrusel.clientWidth;
    carrusel.scrollBy({ left: direccion * distancia, behavior: 'smooth' });
  }

  return <section className="projects section" id="proyectos">
    <div className="section-heading">
      <div><p className="eyebrow eyebrow-dark">PORTAFOLIO</p><h2>Trabajos con identidad <em>propia.</em></h2></div>
      <p>Conoce algunos de nuestros proyectos realizados.</p>
    </div>
    {cargando && <p role="status">Cargando proyectos...</p>}
    {error && <p role="alert">{error}</p>}
    {!cargando && !error && proyectos.length === 0 && <div className="project-placeholder"><p>Próximamente compartiremos nuestros trabajos.</p></div>}
    {!cargando && !error && proyectos.length > 0 && <>
      {proyectos.length > 1 && <div className="project-carousel-controls">
        <span>Desliza para explorar los proyectos</span>
        <div>
          <button type="button" onClick={() => desplazar(-1)} aria-label="Ver proyectos anteriores"><ArrowLeft size={20} /></button>
          <button type="button" onClick={() => desplazar(1)} aria-label="Ver proyectos siguientes"><ArrowRight size={20} /></button>
        </div>
      </div>}
      <div className="public-project-grid public-project-carousel" ref={carruselRef} role="region" aria-roledescription="carrusel" aria-label="Proyectos de Ebanistería Rey David" tabIndex={0}>
        {proyectos.map((proyecto) => <article className="public-project-card" key={proyecto.id}>
          {proyecto.imagen ? <img src={proyecto.imagen} alt={proyecto.nombre || 'Proyecto de ebanistería'} loading="lazy" /> : <div className="project-image-fallback" aria-hidden="true">REY DAVID</div>}
          <div className="public-project-content">
            <span>{proyecto.categoria}</span>
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>
          </div>
        </article>)}
      </div>
    </>}
  </section>;
}
