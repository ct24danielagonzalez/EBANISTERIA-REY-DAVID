import { guardarSolicitud } from './services/contactRequests.js';
import ProjectGallery from './components/ProjectGallery.jsx';
import { useState } from 'react';
import ChatAssistant from './components/ChatAssistant.jsx';
import { Menu, X, ArrowUpRight, Hammer, Sofa, Store, Volume2, Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';

const services = [
  { icon: Hammer, title: 'Ebanistería', text: 'Diseño, fabricación e instalación de soluciones personalizadas en madera.' },
  { icon: Sofa, title: 'Muebles a medida', text: 'Muebles funcionales y duraderos, adaptados a tu espacio y necesidades.' },
  { icon: Store, title: 'Stands y exhibidores', text: 'Espacios para ferias y eventos que ayudan a presentar tu marca.' },
  { icon: Volume2, title: 'Equipos de sonido', text: 'Servicios relacionados con equipos de sonido para proyectos y eventos.' }
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['Inicio', '#inicio'], ['Nosotros', '#nosotros'], ['Servicios', '#servicios'], ['Proyectos', '#proyectos'], ['Contacto', '#contacto']];
  return <header className="site-header">
    <a className="brand" href="#inicio" aria-label="Ebanistería Rey David, inicio">
      <span className="brand-mark">RD</span><span className="brand-name">REY DAVID<small>EBANISTERÍA & MULTISERVICIOS</small></span>
    </a>
    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button>
    <nav className={menuOpen ? 'navigation navigation-open' : 'navigation'}>
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="#contacto" onClick={() => setMenuOpen(false)}>Cotizar proyecto <ArrowUpRight size={16} /></a>
    </nav>
  </header>;
}

function App() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

async function handleSubmit(event) {
  event.preventDefault();

  if (isSubmitting) return;
  setIsSubmitting(true);
  setSent(false);
  setWhatsappUrl('');

  const form = event.currentTarget;
  const data = new FormData(form);

  const solicitud = {
    name: String(data.get('name') || ''),
    email: String(data.get('email') || ''),
    service: String(data.get('service') || ''),
    message: String(data.get('message') || '')
  };

  const phone = String(data.get('phone') || '');

  try {
    await guardarSolicitud(solicitud);

    const mensaje =
      `Hola, soy ${solicitud.name}.\n` +
      `Correo: ${solicitud.email}\n` +
      `Teléfono: ${phone}\n` +
      `Servicio: ${solicitud.service}\n` +
      `Detalles: ${solicitud.message}`;
      setWhatsappUrl(
      'https://wa.me/50765174603?text=' +
      encodeURIComponent(mensaje)
      );

      setSent(true);
      form.reset();

  } catch (error) {
    console.error(error);
    alert(
      'No se pudo guardar la solicitud. Inténtalo nuevamente.'
    );

  }
  finally {
  setIsSubmitting(false);
   }
}


  return <>
    <Header />
    <main>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">DISEÑO · FABRICACIÓN · INSTALACIÓN</p>
          <h1>Tu idea merece un trabajo <em>hecho a medida.</em></h1>
          <p className="hero-description">Creamos soluciones en madera, muebles personalizados y espacios para eventos, con atención a los detalles y a lo que realmente necesitas.</p>
          <div className="hero-actions"><a className="button button-light" href="#servicios">Conoce nuestros servicios <ArrowUpRight size={17} /></a><a className="underlined-link" href="#contacto">Hablemos de tu proyecto</a></div>
        </div>
        <div className="hero-art" role="img" aria-label="Composición gráfica inspirada en la carpintería">
          <div className="wood-panel panel-one"></div><div className="wood-panel panel-two"></div><div className="wood-caption">DISEÑAMOS<br /><strong>CONTIGO</strong></div>
          <span className="hero-index">PANAMÁ · HECHO A MEDIDA</span>
        </div>
      </section>

      <section className="intro section" id="nosotros">
        <div><p className="eyebrow eyebrow-dark">EBANISTERÍA REY DAVID</p><h2>Oficio, creatividad y soluciones <em>para cada proyecto.</em></h2></div>
        <div className="intro-copy"><p>Ebanistería Rey David es una empresa dedicada al diseño, fabricación e instalación de soluciones personalizadas en madera, así como a la creación de stands para ferias y eventos y servicios relacionados con equipos de sonido.</p><p>Atendemos a personas, hogares, emprendedores, empresas y organizaciones que buscan productos funcionales, duraderos y adaptados a sus necesidades específicas.</p></div>
      </section>

      <section className="services section" id="servicios">
        <div className="section-heading"><div><p className="eyebrow eyebrow-dark">LO QUE HACEMOS</p><h2>Soluciones pensadas <em>para ti.</em></h2></div><p>Cuéntanos qué tienes en mente. Te ayudamos a convertir tu idea en un proyecto.</p></div>
        <div className="service-grid">{services.map(({ icon: Icon, title, text }, index) => <article className="service-card" key={title}><span className="service-index">0{index + 1}</span><Icon size={30} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p><a href="#contacto">Consultar servicio <ArrowUpRight size={15} /></a></article>)}</div>
      </section>

      <ProjectGallery />

      <section className="process section">
        <p className="eyebrow">NUESTRO PROCESO</p><h2>De la idea a la <em>realidad.</em></h2>
        <div className="steps">{[['01', 'Nos cuentas', 'Escuchamos tu idea y conocemos tus necesidades.'], ['02', 'Planificamos', 'Definimos los detalles y el alcance del proyecto.'], ['03', 'Fabricamos', 'Damos forma a la solución acordada.'], ['04', 'Instalamos', 'Coordinamos la entrega y puesta en sitio.']].map(([number, title, text]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-copy"><p className="eyebrow">HABLEMOS DE TU PROYECTO</p><h2>¿Qué tienes en mente?</h2><p>Escríbenos y cuéntanos qué necesitas. Estaremos encantados de conocer tu proyecto.</p><a href="tel:+50765174603"><Phone size={17} /> +507 6517-4603</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a><span><MapPin size={17} /> Panamá</span></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Nombre<input name="name" required placeholder="Tu nombre" /></label>
          <label>Correo electrónico<input name="email" type="email" required placeholder="correo@ejemplo.com" /></label>
          <label>Teléfono<input name="phone" placeholder="Tu número de contacto" /></label>
          <label>Servicio de interés<select name="service" required defaultValue=""><option value="" disabled>Selecciona un servicio</option><option>Ebanistería</option><option>Muebles a medida</option><option>Stands para ferias y eventos</option><option>Equipos de sonido</option><option>Otro</option></select></label>
          <label className="field-full">Cuéntanos sobre tu proyecto<textarea name="message" rows="4" required placeholder="Describe brevemente lo que necesitas..." /></label>
          <button
          className="button button-dark"
          type="submit"
          disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
            {!isSubmitting && <Send size={16} />}
            </button>
            {sent && whatsappUrl && (
            <div className="field-full">
            <p className="form-note" role="status">
            Solicitud registrada correctamente.
           Puedes continuar la conversación por WhatsApp.
           </p>

            <a
            href={whatsappUrl}
           target="_blank"
           rel="noopener noreferrer"
           className="button button-dark"
           >
           Continuar por WhatsApp
            </a>
            </div>
           )}  
        </form>
      </section>
    </main>
    <footer className="footer"><a className="footer-brand" href="#inicio">EBANISTERÍA <strong>REY DAVID</strong></a><p>Soluciones a medida, hechas para durar.</p><span>© {new Date().getFullYear()} Ebanistería Rey David</span></footer>
    <ChatAssistant />
  </>;
}

export default App;