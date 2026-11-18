
import { useState } from 'react';
import { crearProyecto } from '../services/adminProjects.js';

export default function ProjectForm() {
  const [proyecto, setProyecto] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Ebanistería',
    imagen: ''
  });

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  function actualizar(event) {
    const { name, value } = event.target;

    setProyecto((anterior) => ({
      ...anterior,
      [name]: value
    }));
  }

  async function guardar(event) {
    event.preventDefault();
    setGuardando(true);
    setMensaje('');
    setError('');

    try {
      await crearProyecto(proyecto);

      setMensaje('Proyecto guardado correctamente.');

      setProyecto({
        nombre: '',
        descripcion: '',
        categoria: 'Ebanistería',
        imagen: ''
      });
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar el proyecto. Revisa Firebase.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className="project-admin">
      <h2>Agregar nuevo proyecto</h2>

      <form onSubmit={guardar}>
        <label>
          Nombre del proyecto
          <input
            name="nombre"
            value={proyecto.nombre}
            onChange={actualizar}
            maxLength={120}
            required
          />
        </label>

        <label>
          Descripción
          <textarea
            name="descripcion"
            value={proyecto.descripcion}
            onChange={actualizar}
            maxLength={2000}
            rows={4}
            required
          />
        </label>

        <label>
          Categoría
          <select
            name="categoria"
            value={proyecto.categoria}
            onChange={actualizar}
          >
            <option>Ebanistería</option>
            <option>Muebles a medida</option>
            <option>Stands y exhibidores</option>
            <option>Equipos de sonido</option>
          </select>
        </label>

        <label>
          URL de imagen (opcional)
          <input
            name="imagen"
            type="url"
            value={proyecto.imagen}
            onChange={actualizar}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </label>

        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar proyecto'}
        </button>

        {mensaje && <p role="status">{mensaje}</p>}
        {error && <p role="alert">{error}</p>}
      </form>
    </section>
  );
}
