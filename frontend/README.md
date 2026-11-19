# Ebanistería Rey David — frontend

Web responsive en React + Vite. Incluye catálogo público con Firebase Firestore, panel administrativo, solicitudes de contacto y chatbot conectado a Cloudflare Worker.

## Desarrollo local

En PowerShell, desde la carpeta `frontend`:

```powershell
npm.cmd install
npm.cmd run dev
```

Usa `npm.cmd` si PowerShell bloquea `npm.ps1`.

Para compilar:

```powershell
npm.cmd run build
```

## Configuración

1. Copia `.env.example` a `.env` dentro de `frontend`.
2. Completa las variables `VITE_FIREBASE_*` y `VITE_ADMIN_UID` según tu proyecto Firebase.
3. Configura Firebase Authentication y reglas de Firestore en Firebase Console. **Las verificaciones de UID en React son solo de interfaz; las reglas de Firestore deben proteger los datos.**
4. El chatbot usa la dirección definida en `VITE_CHAT_API_URL` o la dirección predeterminada del Worker. Mantén la clave de Gemini únicamente en el Worker (secretos), nunca en variables `VITE_`.

## Colecciones de Firestore

- `productos`: `nombre`, `descripcion`, `categoria`, `imagen`, `fechaCreacion`.
- `solicitudes`: `name`, `email`, `service`, `message`, `status`, `createdAt`.

La lista pública requiere lectura de `productos`. Solo el administrador autorizado debe poder crear, editar o borrar proyectos, y leer solicitudes. La creación pública de solicitudes debe limitarse con validación, cuotas y medidas antiabuso adecuadas en las reglas/backend.

## Recursos provisionales

- Inicio: fotografía temporal de Unsplash. Sustituir por video propio optimizado cuando esté disponible.
- Servicios: fotografías temporales de Unsplash, reemplazar por imágenes autorizadas de trabajos reales.
- Encabezado: continúa con el monograma «RD» en GitHub; el logotipo oficial se debe integrar y verificar después.
- Instagram oficial: https://www.instagram.com/serviciosreydavid_ebanisteria/
- Teléfono y WhatsApp: +507 6517-4603.

## Antes de desplegar

- [ ] Resolver los cambios locales del logotipo antes de sincronizar `main`.
- [ ] `npm.cmd install` y `npm.cmd run build` sin errores.
- [ ] Confirmar que las imágenes provisionales cargan y el diseño se adapta a móvil, tableta y escritorio.
- [ ] Comprobar carrusel con cero, uno y varios proyectos en Firestore.
- [ ] Comprobar login, autorización y CRUD del administrador.
- [ ] Comprobar solicitud de contacto y visualización en administración.
- [ ] Comprobar flujo del asistente de IA y reglas CORS/rate limit del Worker.
- [ ] Comprobar enlaces a Instagram, WhatsApp y teléfono.
- [ ] Auditar reglas de Firestore y restricciones de abuso antes de hacer público el formulario.
- [ ] Probar navegación por teclado, contraste y movimiento reducido.
- [ ] Elegir hosting, dominio, DNS y HTTPS; revisar título y metadatos una vez desplegado.

## Sincronización con una copia local modificada

Antes de hacer `git pull`, ejecutar `git status` desde la raíz y guardar los cambios locales con un commit o `git stash`. No sobrescribir archivos sin revisar el resultado, especialmente `src/App.jsx`, `src/styles.css` y los componentes que antes existían solo localmente.
