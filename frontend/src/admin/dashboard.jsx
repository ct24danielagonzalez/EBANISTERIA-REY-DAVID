import ContactList from './ContactList.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase.js';
import ProjectForm from './ProjectForm.jsx';
import ProjectList from './ProjectList.jsx';

export default function Dashboard({ user }) {
  async function cerrarSesion() {
    await signOut(auth);
  }

  return (
    <main className="admin-dashboard">
      <h1>Panel administrativo</h1>
      <p>Bienvenido a Ebanistería Rey David.</p>
      <p>Sesión iniciada: {user.email}</p>

      <h2>Administración de proyectos</h2>
      <ProjectForm />
      <ProjectList />
      <ContactList />
      <p>
        Aquí agregaremos las herramientas para crear,
        editar y eliminar proyectos del catálogo.
      </p>

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </main>
  );
}
