import { useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const endpoint = import.meta.env.VITE_CHAT_API_URL || 'https://ebanisteria-rey-david-ai.cornejodaniela29008.workers.dev/';

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: '¡Hola! Soy el asistente virtual de Ebanistería Rey David. ¿En qué podemos ayudarte?' }]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const controller = useRef(null);

  async function send(event) {
    event.preventDefault();
    const message = input.trim().slice(0, 500);
    if (!message || pending) return;
    setMessages((list) => [...list, { role: 'user', content: message }]);
    setInput('');
    setPending(true);
    controller.current = new AbortController();
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: controller.current.signal
      });
      if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
      const data = await response.json();
      const reply = typeof data === 'string' ? data : (data.reply || data.response || data.text || data.message);
      if (!reply || typeof reply !== 'string') throw new Error('Formato de respuesta no reconocido');
      setMessages((list) => [...list, { role: 'assistant', content: reply }]);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error del asistente:', error);
        setMessages((list) => [...list, { role: 'assistant', content: 'No pude responder en este momento. Puedes escribirnos por WhatsApp al +507 6517-4603.' }]);
      }
    } finally {
      setPending(false);
      controller.current = null;
    }
  }

  return <aside className="chat-assistant" aria-label="Asistente virtual">
    {open && <section className="chat-window" aria-label="Chat de Ebanistería Rey David">
      <div className="chat-header"><h3>Asistente Rey David</h3><button type="button" aria-label="Cerrar asistente" onClick={() => setOpen(false)}><X size={20} /></button></div>
      <div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions text">
        {messages.map((item, index) => <p key={index} className={`chat-message-${item.role}`}>{item.content}</p>)}
        {pending && <p role="status">Escribiendo...</p>}
      </div>
      <form className="chat-input" onSubmit={send}>
        <input aria-label="Escribe tu pregunta" placeholder="¿En qué podemos ayudarte?" maxLength={500} value={input} onChange={(e) => setInput(e.target.value)} disabled={pending} />
        <button type="submit" disabled={pending || !input.trim()} aria-label="Enviar mensaje"><Send size={20} /></button>
      </form>
    </section>}
    <button className="chat-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Cerrar asistente' : 'Abrir asistente'} aria-expanded={open}>
      {open ? <X size={26} /> : <MessageCircle size={27} />}
    </button>
  </aside>;
}
