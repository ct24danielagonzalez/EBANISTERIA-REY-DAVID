import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="chat-assistant">
      {isOpen && (
        <section
          className="chat-window"
          aria-label="Asistente virtual"
        >
          <header className="chat-header">
            <h3>Asistente Rey David</h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </header>

          <div className="chat-messages" aria-live="polite">
            <p>
              ¡Hola! Soy el asistente virtual de
              Ebanistería Rey David.
              ¿En qué puedo ayudarte?
            </p>
          </div>

          <form
            className="chat-input"
            onSubmit={(event) => {
              event.preventDefault();
              // Conectaremos la IA en un paso posterior.
            }}
          >
            <input
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Escribe tu pregunta..."
              aria-label="Tu pregunta"
            />
            <button type="submit" disabled={!message.trim()}>
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}