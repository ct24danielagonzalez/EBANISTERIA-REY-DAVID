# Ebanistería Rey David

Sitio web responsive de **Ebanistería Rey David**, empresa panameña dedicada a la ebanistería, muebles a medida, stands y exhibidores, y servicios relacionados con equipos de sonido.

**Sitio web:** https://ct24danielagonzalez.github.io/EBANISTERIA-REY-DAVID/

## Funcionalidades

- **Sitio público:** inicio con video corporativo, descripción de la empresa, servicios, proceso de trabajo y contacto.
- **Portafolio dinámico:** carrusel de proyectos consultados desde Cloud Firestore.
- **Cotizaciones:** formulario con nombre, correo, teléfono, servicio y descripción. La solicitud se guarda en Firestore y después se abre WhatsApp con un mensaje prellenado; el cliente confirma el envío desde WhatsApp.
- **Panel administrativo:** inicio de sesión con Firebase Authentication y comprobación del usuario administrador; creación, edición y eliminación de proyectos; consulta y eliminación de solicitudes de cotización.
- **Imágenes de proyectos:** se admite una URL pública o un archivo de imagen (si Firebase Storage está configurado y disponible).
- **Asistente virtual:** chat integrado con un endpoint de Cloudflare Worker.
- **Diseño adaptable:** interfaz para dispositivos móviles y escritorio.

## Tecnologías

| Capa | Tecnología |
| --- | --- |
| Interfaz | React 18, Vite 8, CSS, lucide-react |
| Base de datos | Firebase Cloud Firestore |
| Autenticación | Firebase Authentication |
| Archivos de proyectos | Firebase Storage (opcional según configuración) o URL externa |
| Asistente | Cloudflare Worker, consumido desde el navegador |
| Hospedaje del frontend | GitHub Pages |
| Despliegue | GitHub Actions |

El repositorio también contiene una **Firebase Cloud Function de verificación** (`backend/functions/index.js`); no es el backend del asistente virtual.

## Ejecutar localmente

**Requisitos:** Node.js compatible con Vite 8 y npm.

```bash
git clone https://github.com/ct24danielagonzalez/EBANISTERIA-REY-DAVID.git
cd EBANISTERIA-REY-DAVID/frontend
npm install
```

Copia `frontend/.env.example` a `frontend/.env` y completa las variables necesarias para tu proyecto Firebase. Luego:

```bash
npm run dev
```

Para generar y probar la versión de producción:

```bash
npm run build
npm run preview
```

En PowerShell, si se bloquea `npm.ps1`, puedes usar `npm.cmd` en lugar de `npm`.

## Configuración

Variables utilizadas por el frontend:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_ADMIN_UID=
VITE_CHAT_API_URL=
```

`VITE_CHAT_API_URL` es opcional: el componente del asistente tiene un endpoint predeterminado. El resto se configura según los servicios que se utilicen.

**Seguridad:** las variables `VITE_*` quedan incluidas en el código JavaScript distribuido al navegador. No coloques contraseñas, claves privadas ni tokens secretos allí. La autorización efectiva sobre los datos se aplica en las reglas de Firebase, no solo en la interfaz.

Las reglas versionadas están en `backend/firestore.rules` y `backend/storage.rules`. Deben revisarse y publicarse en el proyecto Firebase correspondiente antes de utilizar el sistema; el hecho de existir en GitHub no significa que estén desplegadas.

## Datos y permisos

**Cloud Firestore:**

- `productos`: `nombre`, `descripcion`, `categoria`, `imagen`, `fechaCreacion`.
- `solicitudes`: `name`, `email`, `phone`, `service`, `message`, `status`, `createdAt`.

Según las reglas versionadas, los proyectos son de lectura pública y sus modificaciones quedan limitadas al UID administrador autorizado. El público puede crear solicitudes bajo validaciones; únicamente el administrador puede leerlas o eliminarlas. La protección contra envíos abusivos debe evaluarse para el uso en producción.

La ruta del panel es `#admin` dentro del sitio. El acceso requiere una cuenta autorizada de Firebase Authentication.

## Estructura principal

```text
EBANISTERIA-REY-DAVID/
├── README.md                  # Presentación del repositorio
├── frontend/
│   ├── src/
│   │   ├── admin/             # Acceso y panel administrativo
│   │   ├── components/        # Catálogo y asistente
│   │   ├── services/          # Firebase, proyectos y solicitudes
│   │   ├── App.jsx            # Sitio público
│   │   └── main.jsx           # Punto de entrada y control de acceso
│   ├── recurso/               # Medios estáticos
│   └── vite.config.js
├── backend/
│   ├── firestore.rules
│   ├── storage.rules
│   └── functions/             # Función de verificación
└── .github/workflows/         # Compilación y publicación
```

## Publicación en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` publica el contenido compilado de `frontend/dist` al hacer push a `main` (o mediante ejecución manual).

1. En **Settings > Pages**, selecciona **GitHub Actions** como origen de publicación.
2. En **Settings > Secrets and variables > Actions > Variables**, configura las variables `VITE_FIREBASE_*` requeridas y `VITE_ADMIN_UID`; `VITE_CHAT_API_URL` es opcional.
3. En Firebase Authentication, autoriza el dominio de GitHub Pages correspondiente.
4. Comprueba que el Worker admita solicitudes desde el origen del sitio y que las reglas activas de Firebase tengan los permisos esperados.
5. Revisa el resultado del workflow en **Actions** y prueba el formulario, el carrusel, el chat y el panel administrativo.

El archivo `frontend/vite.config.js` establece la ruta base `/EBANISTERIA-REY-DAVID/` para la compilación publicada.

## Consideraciones de mantenimiento

- Las imágenes enlazadas externamente dependen de que sus URL sigan siendo accesibles.
- Al eliminar un proyecto se borra su documento de Firestore; el código actual **no borra automáticamente** una imagen previamente subida a Storage.
- El envío de una cotización se registra primero en Firestore. La apertura de WhatsApp no equivale a confirmar que el cliente envió el mensaje.
- No subas archivos `.env` con información confidencial al repositorio.

## Contacto

- **WhatsApp:** +507 6517-4603
- **Instagram:** https://www.instagram.com/serviciosreydavid_ebanisteria/
