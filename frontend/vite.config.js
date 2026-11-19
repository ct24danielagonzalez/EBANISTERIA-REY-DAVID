import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages publica este repositorio bajo /EBANISTERIA-REY-DAVID/.
// El desarrollo local conserva la raíz /.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/EBANISTERIA-REY-DAVID/' : '/'
});
