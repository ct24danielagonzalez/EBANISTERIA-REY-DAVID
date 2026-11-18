
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase.js';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!auth) {
      setError('Firebase no está configurado.');
      return;
    }

    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      onLogin(result.user);
    } catch {
      setError('No se pudo iniciar sesión. Revisa tus datos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login">
      <form onSubmit={handleSubmit}>
        <h1>Administración</h1>
        <p>Ebanistería Rey David</p>

        <label htmlFor="admin-email">Correo electrónico</label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="admin-password">Contraseña</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>

        {error && <p role="alert">{error}</p>}
      </form>
    </main>
  );
}
