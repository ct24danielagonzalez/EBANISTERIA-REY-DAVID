# Ebanistería Rey David

Sitio web responsive para presentar los servicios, proyectos y medios de contacto de Ebanistería Rey David.

## Tecnologías
- React y Vite para la interfaz.
- CSS para estilos responsive.
- Firebase Authentication y Cloud Firestore (cuando se configure el proyecto).
- Firebase Functions para futuras operaciones de backend.

## Requisitos
- Node.js LTS
- Git
- Visual Studio Code

## Ejecutar localmente
1. Clona el repositorio.
2. Ejecuta `npm install`.
3. Copia `.env.example` como `.env` y completa la configuración de Firebase.
4. Ejecuta `npm run dev`.

## Estructura
- `frontend/`: aplicación React.
- `backend/`: reglas de Firestore y funciones de servidor.
- `recursos/`: imágenes, videos e iconos servidos por Vite.

## Publicación
GitHub Pages sirve el frontend estático. Las funciones de servidor se despliegan por separado en Firebase. No guardes claves privadas de servicios de IA en el frontend.

## Estado
Primera etapa: estructura, diseño inicial, navegación y secciones informativas. La conexión real con Firebase se completará cuando se cree/configure el proyecto Firebase.