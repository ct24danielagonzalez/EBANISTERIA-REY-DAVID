import { guardarSolicitud } from './services/contactRequests.js';
import ProjectGallery from './components/ProjectGallery.jsx';
import { useState } from 'react';
import ChatAssistant from './components/ChatAssistant.jsx';
import { Menu, X, ArrowUpRight, Hammer, Sofa, Store, Volume2, Phone, MapPin, Instagram, Send, ClipboardList, Ruler, Wrench, CheckCircle2, MessageCircle } from 'lucide-react';

const services = [
  { photo: 'servicio.ebanisteria.jpeg', icon: Hammer, title: 'Ebanistería', text: 'Diseño, fabricación e instalación de soluciones personalizadas en madera.' },
  { photo: 'Servicio.muebles.jpeg', icon: Sofa, title: 'Muebles a medida', text: 'Muebles funcionales y duraderos, adaptados a tu espacio y necesidades.' },
  { photo: 'Servicio.stand.jpeg', icon: Store, title: 'Stands y exhibidores', text: 'Espacios para ferias y eventos que ayudan a presentar tu marca.' },
  { photo: 'Servicio.sonido.jpeg', icon: Volume2, title: 'Equipos de sonido', text: 'Servicios relacionados con equipos de sonido para proyectos y eventos.' }
];

const instagramUrl = 'https://www.instagram.com/serviciosreydavid_ebanisteria/';

const processSteps = [
  { icon: ClipboardList, number: '01', title: 'Nos cuentas', text: 'Escuchamos tu idea y conocemos tus necesidades.' },
  { icon: Ruler, number: '02', title: 'Planificamos', text: 'Definimos los detalles y el alcance del proyecto.' },
  { icon: Wrench, number: '03', title: 'Fabricamos', text: 'Damos forma a la solución acordada.' },
  { icon: CheckCircle2, number: '04', title: 'Instalamos', text: 'Coordinamos la entrega y puesta en sitio.' }
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const links = [['Inicio', '#inicio'], ['Nosotros', '#nosotros'], ['Servicios', '#servicios'], ['Proyectos', '#proyectos'], ['Contacto', '#contacto']];
  return <header className="site-header">
    <a className="brand" href="#inicio" aria-label="Ebanistería Rey David, inicio">
      <img className="brand-logo" src={`${import.meta.env.BASE_URL}recurso/logoR.png`} alt="" onLoad={() => setLogoLoaded(true)} onError={() => setLogoLoaded(false)} style={{ display: logoLoaded ? undefined : 'none' }} />{!logoLoaded && <span className="brand-mark">RD</span>}<span className="brand-name">REY DAVID<small>EBANISTERÍA & MULTISERVICIOS</small></span>
    </a>
    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation">{menuOpen ? <X /> : <Menu />}</button>
    <nav id="main-navigation" aria-label="Navegación principal" className={menuOpen ? 'navigation navigation-open' : 'navigation'}>
      {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="#contacto" onClick={() => setMenuOpen(false)}>Cotizar proyecto <ArrowUpRight size={16} /></a>
    </nav>
  </header>;
}

function App() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [videoDisponible, setVideoDisponible] = useState(true);

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
    phone: String(data.get('phone') || ''),
    service: String(data.get('service') || ''),
    message: String(data.get('message') || '')
  };

  try {
    await guardarSolicitud(solicitud);

    const mensaje =
      `Hola, soy ${solicitud.name}.\n` +
      `Correo: ${solicitud.email}\n` +
      `Teléfono: ${solicitud.phone}\n` +
      `Servicio: ${solicitud.service}\n` +
      `Detalles: ${solicitud.message}`;
      const url = 'https://wa.me/50765174603?text=' + encodeURIComponent(mensaje);
      setWhatsappUrl(url);
      setSent(true);
      form.reset();
      // El registro ya se guardó: abrir WhatsApp con la cotización preescrita.
      // El cliente confirma el envío desde WhatsApp.
      window.location.assign(url);

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
        <div className="hero-art hero-photo" role="img" aria-label="Trabajos de Ebanistería Rey David">
          {videoDisponible && <video className="hero-video" autoPlay muted playsInline loop preload="metadata" onError={() => setVideoDisponible(false)}><source src={`${import.meta.env.BASE_URL}recurso/VideoPrincipal.mp4`} type="video/mp4" /></video>}
          <div className="wood-caption">DISEÑAMOS<br /><strong>CONTIGO</strong></div>
          <span className="hero-index">PANAMÁ · HECHO A MEDIDA</span>
        </div>
      </section>

      <section className="intro section" id="nosotros">
        <div><p className="eyebrow eyebrow-dark">EBANISTERÍA REY DAVID</p><h2>Oficio, creatividad y soluciones <em>para cada proyecto.</em></h2></div>
        <div className="intro-copy"><p>Ebanistería Rey David es una empresa dedicada al diseño, fabricación e instalación de soluciones personalizadas en madera, así como a la creación de stands para ferias y eventos y servicios relacionados con equipos de sonido.</p><p>Atendemos a personas, hogares, emprendedores, empresas y organizaciones que buscan productos funcionales, duraderos y adaptados a sus necesidades específicas.</p></div>
      </section>

      <section className="services section" id="servicios">
        <div className="section-heading"><div><p className="eyebrow eyebrow-dark">LO QUE HACEMOS</p><h2>Soluciones pensadas <em>para ti.</em></h2></div><p>Cuéntanos qué tienes en mente. Te ayudamos a convertir tu idea en un proyecto.</p></div>
        <div className="service-grid">{services.map(({ photo, icon: Icon, title, text }, index) => <article className={`service-card service-card-${index + 1}`} style={{ backgroundImage: `url("${import.meta.env.BASE_URL}recurso/${photo}"), url("${['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80'][index]")` }} key={title}><span className="service-index">0{index + 1}</span><Icon size={30} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><a href="#contacto">Consultar servicio <ArrowUpRight size={15} /></a></article>)}</div>
      </section>

      <ProjectGallery />

      <section className="process section" id="proceso" aria-labelledby="process-title">
        <div className="process-heading">
          <div><p className="eyebrow">NUESTRO PROCESO</p><h2 id="process-title">De la idea a la <em>realidad.</em></h2></div>
          <p>Un camino claro desde la primera conversación hasta la entrega de tu proyecto.</p>
        </div>
        <ol className="steps">{processSteps.map(({ icon: Icon, number, title, text }) => <li className="process-step" key={number}>
          <div className="process-step-top"><span className="process-icon"><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span><span className="process-number">{number}</span></div>
          <h3>{title}</h3><p>{text}</p>
        </li>)}</ol>
        <a className="process-link" href="#contacto">Empecemos tu proyecto <ArrowUpRight size={17} /></a>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-copy"><p className="eyebrow">HABLEMOS DE TU PROYECTO</p><h2>¿Qué tienes en mente?</h2><p>Escríbenos y cuéntanos qué necesitas. Estaremos encantados de conocer tu proyecto.</p><a href="tel:+50765174603"><Phone size={17} /> +507 6517-4603</a><a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Visitar Instagram de Ebanistería Rey David"><Instagram size={17} /> @serviciosreydavid_ebanisteria <ArrowUpRight size={14} /></a><a href="https://wa.me/50765174603" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Escríbenos por WhatsApp</a><span><MapPin size={17} /> Panamá</span></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Nombre<input name="name" autoComplete="name" maxLength={120} required placeholder="Tu nombre" /></label>
          <label>Correo electrónico<input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="correo@ejemplo.com" /></label>
          <label>Teléfono de contacto<input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} required placeholder="Ej. +507 6123-4567" /></label>
          <label>Servicio de interés<select name="service" required defaultValue=""><option value="" disabled>Selecciona un servicio</option><option>Ebanistería</option><option>Muebles a medida</option><option>Stands para ferias y eventos</option><option>Equipos de sonido</option><option>Otro</option></select></label>
          <label className="field-full">Cuéntanos sobre tu proyecto<textarea name="message" rows="4" minLength={10} maxLength={2000} required placeholder="Describe brevemente lo que necesitas..." /></label>
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
            Solicitud registrada correctamente. Si WhatsApp no se abrió, utiliza el enlace siguiente.
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
    <footer className="footer"><a className="footer-brand" href="#inicio">EBANISTERÍA <strong>REY DAVID</strong></a><p>Soluciones a medida, hechas para durar.</p><div className="footer-links"><a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://wa.me/50765174603" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div><span>© {new Date().getFullYear()} Ebanistería Rey David</span></footer>
    <ChatAssistant />
  </>;
}

export default App;