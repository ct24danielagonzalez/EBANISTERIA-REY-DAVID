# Recursos reales de Ebanistería Rey David

Coloca directamente en esta carpeta las imágenes y el video de la empresa, conservando sus nombres originales:

- logoR.png
- VideoPrincipal.mp4
- servicio.ebanisteria.jpeg
- Servicio.muebles.jpeg
- Servicio.stand.jpeg
- Servicio.sonido.jpeg
- Proyecto1.jpeg, Proyecto 2.jpeg, proyecto4.jpeg, proyecto5.jpeg, proyecto7.jpeg, proyecto8.jpeg, proyecto9.jpeg, proyecto10.jpeg, proyecto11.jpeg, Proyecto12.jpeg

La página utiliza automáticamente el logo, el video y las cuatro imágenes de servicios desde esta carpeta. Mientras los archivos no estén disponibles, mantiene los elementos visuales provisionales.

Las fotos de proyectos se agregan desde el panel administrativo, con su título, categoría y descripción. El panel sube nuevas imágenes a Firebase Storage para poder funcionar desde un navegador; no puede modificar directamente archivos del repositorio GitHub.

Las reglas de Storage están preparadas en backend/storage.rules. Deben publicarse desde Firebase antes de utilizar la función de carga. Mantén las reglas existentes de Firestore sin cambios.
