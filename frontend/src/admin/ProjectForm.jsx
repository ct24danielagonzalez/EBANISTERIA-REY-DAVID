
import { useState } from 'react';
import { crearProyecto } from '../services/adminProjects.js';
import { subirImagenProyecto } from '../services/projectImages.js';

export default function ProjectForm() {
  const [proyecto, setProyecto] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Ebanistería',
    imagen: ''
  });

  const [archivo, setArchivo] = useState(null);
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
    const form = event.currentTarget;
    setGuardando(true);
    setMensaje('');
    setError('');

    try {
      const imagen = archivo ? await subirImagenProyecto(archivo) : proyecto.imagen;
      await crearProyecto({ ...proyecto, imagen });

      setMensaje('Proyecto guardado correctamente.');
      setArchivo(null);
      form.reset();
      window.dispatchEvent(new Event('project-updated'));

      setProyecto({
        nombre: '',
        descripcion: '',
        categoria: 'Ebanistería',
        imagen: ''
      });
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo guardar el proyecto. Revisa Firebase.');
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
          Imagen desde tu computador (opcional)
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setArchivo(event.target.files?.[0] || null)} />
        </label>

        <label>
          URL de imagen (opcional; método anterior)
          <input
            name="imagen"
            type="url"
            disabled={Boolean(archivo)}
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
