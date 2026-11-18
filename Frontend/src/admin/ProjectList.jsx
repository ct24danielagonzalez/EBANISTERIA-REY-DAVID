
import { useEffect, useState } from 'react';

import {
  obtenerProyectos,
  eliminarProyecto,
  actualizarProyecto
} from '../services/adminProjects.js';

export default function ProjectList() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [eliminando, setEliminando] = useState(null);

  const [editando, setEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Ebanistería',
    imagen: ''
  });

  useEffect(() => {
    async function cargarProyectos() {
      try {
        const datos = await obtenerProyectos();
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

  function comenzarEdicion(proyecto) {
    setEditando(proyecto.id);
    setError('');

    setFormulario({
      nombre: proyecto.nombre || '',
      descripcion: proyecto.descripcion || '',
      categoria: proyecto.categoria || 'Ebanistería',
      imagen: proyecto.imagen || ''
    });
  }

  function cambiarCampo(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }));
  }

  async function guardarCambios(event) {
    event.preventDefault();
    setGuardando(true);
    setError('');

    try {
      await actualizarProyecto(editando, formulario);

      setProyectos((anteriores) =>
        anteriores.map((proyecto) =>
          proyecto.id === editando
            ? { ...proyecto, ...formulario }
            : proyecto
        )
      );

      setEditando(null);
    } catch (err) {
      console.error(err);
      setError('No se pudieron guardar los cambios.');
    } finally {
      setGuardando(false);
    }
  }

  async function borrarProyecto(proyecto) {
    const confirmado = window.confirm(
      `¿Seguro que deseas eliminar "${proyecto.nombre}"?`
    );

    if (!confirmado) return;

    setEliminando(proyecto.id);
    setError('');

    try {
      await eliminarProyecto(proyecto.id);

      setProyectos((anteriores) =>
        anteriores.filter((item) => item.id !== proyecto.id)
      );
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar el proyecto.');
    } finally {
      setEliminando(null);
    }
  }

  return (
    <section className="project-list">
      <h2>Proyectos registrados</h2>

      {cargando && <p>Cargando proyectos...</p>}
      {error && <p role="alert">{error}</p>}

      {!cargando && !error && proyectos.length === 0 && (
        <p>Todavía no hay proyectos registrados.</p>
      )}

      <div className="project-list-grid">
        {proyectos.map((proyecto) => (
          <article className="project-item" key={proyecto.id}>
            {editando === proyecto.id ? (
              <form
                className="project-edit-form"
                onSubmit={guardarCambios}
              >
                <h3>Editar proyecto</h3>

                <label>
                  Nombre
                  <input
                    name="nombre"
                    value={formulario.nombre}
                    onChange={cambiarCampo}
                    maxLength={120}
                    required
                  />
                </label>

                <label>
                  Descripción
                  <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={cambiarCampo}
                    maxLength={2000}
                    required
                  />
                </label>

                <label>
                  Categoría
                  <select
                    name="categoria"
                    value={formulario.categoria}
                    onChange={cambiarCampo}
                  >
                    <option>Ebanistería</option>
                    <option>Muebles a medida</option>
                    <option>Stands y exhibidores</option>
                    <option>Equipos de sonido</option>
                  </select>
                </label>

                <label>
                  URL de imagen
                  <input
                    name="imagen"
                    type="url"
                    value={formulario.imagen}
                    onChange={cambiarCampo}
                  />
                </label>

                <button type="submit" disabled={guardando}>
                  {guardando ? 'Guardando...' : 'Guardar cambios'}
                </button>

                <button
                  type="button"
                  disabled={guardando}
                  onClick={() => setEditando(null)}
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                {proyecto.imagen && (
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.nombre}
                    loading="lazy"
                  />
                )}

                <h3>{proyecto.nombre}</h3>
                <p>{proyecto.descripcion}</p>
                <span>{proyecto.categoria}</span>

                <button
                  type="button"
                  className="project-edit-button"
                  disabled={eliminando !== null}
                  onClick={() => comenzarEdicion(proyecto)}
                >
                  Editar proyecto
                </button>

                <button
                  type="button"
                  className="project-delete-button"
                  disabled={eliminando !== null}
                  onClick={() => borrarProyecto(proyecto)}
                >
                  {eliminando === proyecto.id
                    ? 'Eliminando...'
                    : 'Eliminar proyecto'}
                </button>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

