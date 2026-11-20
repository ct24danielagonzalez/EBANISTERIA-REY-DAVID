import { useEffect, useState } from 'react';
import { subirImagenProyecto } from '../services/projectImages.js';
import { actualizarProyecto, eliminarProyecto, obtenerProyectos } from '../services/adminProjects.js';

export default function ProjectList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState('');
  const [editingFile, setEditingFile] = useState(null);
  async function refresh() {
    try { setItems(await obtenerProyectos()); setError(''); }
    catch { setError('No se pudieron cargar los proyectos.'); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    refresh();
    window.addEventListener('project-updated', refresh);
    return () => window.removeEventListener('project-updated', refresh);
  }, []);
  async function remove(id) {
    if (!window.confirm('¿Eliminar este proyecto de forma permanente?')) return;
    setBusy(id);
    try { await eliminarProyecto(id); setItems((list) => list.filter((item) => item.id !== id)); }
    catch { setError('No se pudo eliminar el proyecto.'); }
    finally { setBusy(''); }
  }
  async function save(event) {
    event.preventDefault();
    if (!editing) return;
    setBusy(editing.id);
    try {
      const imagen = editingFile ? await subirImagenProyecto(editingFile) : editing.imagen;
      await actualizarProyecto(editing.id, { ...editing, imagen });
      setEditing(null);
      setEditingFile(null);
      await refresh();
    }
    catch (err) { setError(err.message || 'No se pudieron guardar los cambios.'); }
    finally { setBusy(''); }
  }
  return <section className="project-list" aria-labelledby="admin-projects-heading">
    <h2 id="admin-projects-heading">Proyectos publicados</h2>
    <button type="button" onClick={refresh}>Actualizar lista</button>
    {loading && <p>Cargando proyectos...</p>}
    {error && <p role="alert">{error}</p>}
    {!loading && !error && items.length === 0 && <p>No hay proyectos registrados todavía.</p>}
    <div className="project-list-grid">{items.map((item) => <article className="project-item" key={item.id}>
      {item.imagen && <img src={item.imagen} alt={item.nombre || 'Proyecto'} loading="lazy" />}
      {editing?.id === item.id ? <form className="project-edit-form" onSubmit={save}>
        <label>Nombre<input required maxLength={120} value={editing.nombre || ''} onChange={(e) => setEditing({ ...editing, nombre: e.target.value })} /></label>
        <label>Descripción<textarea required maxLength={2000} value={editing.descripcion || ''} onChange={(e) => setEditing({ ...editing, descripcion: e.target.value })} /></label>
        <label>Categoría<select value={editing.categoria || 'Ebanistería'} onChange={(e) => setEditing({ ...editing, categoria: e.target.value })}><option>Ebanistería</option><option>Muebles a medida</option><option>Stands y exhibidores</option><option>Equipos de sonido</option></select></label>
        <label>Nueva imagen desde tu computador<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(e) => setEditingFile(e.target.files?.[0] || null)} /></label>
        <label>Imagen URL (método anterior)<input type="url" disabled={Boolean(editingFile)} value={editing.imagen || ''} onChange={(e) => setEditing({ ...editing, imagen: e.target.value })} /></label>
        <button type="submit" disabled={Boolean(busy)}>Guardar cambios</button>
        <button type="button" onClick={() => { setEditing(null); setEditingFile(null); }}>Cancelar</button>
      </form> : <>
        <h3>{item.nombre}</h3><p>{item.descripcion}</p><span>{item.categoria}</span>
        <button type="button" className="project-edit-button" onClick={() => { setEditing({ ...item }); setEditingFile(null); }}>Editar</button>
        <button type="button" className="project-delete-button" disabled={Boolean(busy)} onClick={() => remove(item.id)}>Eliminar</button>
      </>}
    </article>)}</div>
  </section>;
}
