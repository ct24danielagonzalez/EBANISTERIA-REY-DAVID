
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AI_ENDPOINT =
  'https://ebanisteria-rey-david-ai.cornejodaniela29008.workers.dev/';

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: '¡Hola! Soy el asistente virtual de Ebanistería Rey David. ¿En qué puedo ayudarte?'
  }
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen, isLoading]);

  async function handleSubmit(event) {
    event.preventDefault();

    const question = message.trim();

    if (
      !question ||
      question.length > 1000 ||
      sendingRef.current
    ) {
      return;
    }

    sendingRef.current = true;
    setIsLoading(true);
    setMessage('');

    setMessages((previous) => [
      ...previous,
      { role: 'user', text: question }
    ]);

    try {
      const response = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: question
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            'Has enviado demasiados mensajes. Intenta nuevamente en un minuto.'
          );
        }

        throw new Error(
          data.error ||
          'No se pudo obtener una respuesta.'
        );
      }

      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error(
          'El asistente no devolvió una respuesta válida.'
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          text: data.reply
        }
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          text:
            error instanceof Error
              ? error.message
              : 'Ocurrió un error. Intenta nuevamente.'
        }
      ]);
    } finally {
      sendingRef.current = false;
      setIsLoading(false);
    }
  }

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

          <div
            className="chat-messages"
            aria-live="polite"
            role="log"
          >
            {messages.map((item, index) => (
              <p
                key={index}
                className={
                  item.role === 'user'
                    ? 'chat-message-user'
                    : 'chat-message-assistant'
                }
              >
                {item.text}
              </p>
            ))}

            {isLoading && (
              <p className="chat-message-assistant">
                Escribiendo respuesta...
              </p>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="chat-input"
            onSubmit={handleSubmit}
          >
            <input
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Escribe tu pregunta..."
              aria-label="Tu pregunta"
              maxLength={1000}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              aria-label="Enviar mensaje"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen ? 'Cerrar asistente' : 'Abrir asistente'
        }
        aria-expanded={isOpen}
      >
        {isOpen
          ? <X size={24} />
          : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
