
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import App from './App.jsx';
import Login from './admin/Login.jsx';
import Dashboard from './admin/dashboard.jsx';
import { auth } from './services/firebase.js';

import './styles.css';

function Root() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdminRoute, setIsAdminRoute] = useState(
    window.location.hash === '#admin'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (!isAdminRoute) {
    return <App />;
  }

  if (loading) {
    return <p>Verificando sesión...</p>;
  }

if (!user) {
  return <Login onLogin={setUser} />;
}

const adminUid = import.meta.env.VITE_ADMIN_UID;

if (!adminUid || user.uid !== adminUid) {
  return (
    <main className="admin-login">
      <div>
        <h1>Acceso denegado</h1>
        <p>
          Esta cuenta no tiene permisos para administrar
          Ebanistería Rey David.
        </p>

        <button
          type="button"
          onClick={() => signOut(auth)}
        >
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}

  return <Dashboard user={user} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
