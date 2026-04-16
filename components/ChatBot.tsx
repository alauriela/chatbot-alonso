"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente de Alonso & Espinosa. ¿Tienes alguna pregunta sobre nuestros servicios?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, hubo un error procesando tu pregunta. Por favor, intenta de nuevo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <style jsx>{`
        .chatbot-container {
          display: flex;
          flex-direction: column;
          height: 500px;
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #dfe6e9;
          border-radius: 12px;
          background: white;
          box-shadow: 0 4px 12px rgba(46, 74, 90, 0.1);
          font-family: "DM Sans", system-ui, sans-serif;
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          display: flex;
          gap: 8px;
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 8px;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .message.assistant .message-content {
          background: #eef3fd;
          color: #2e4a5a;
          border-left: 3px solid #5ad1e5;
        }

        .message.user .message-content {
          background: #2e4a5a;
          color: white;
        }

        .form-container {
          border-top: 1px solid #dfe6e9;
          padding: 16px;
          display: flex;
          gap: 8px;
        }

        .input-group {
          display: flex;
          gap: 8px;
          flex: 1;
        }

        input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #dfe6e9;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        input:focus {
          outline: none;
          border-color: #5ad1e5;
          box-shadow: 0 0 0 3px rgba(90, 209, 229, 0.1);
        }

        button {
          padding: 10px 16px;
          background: #2e4a5a;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: background 0.2s;
        }

        button:hover:not(:disabled) {
          background: #3e6b7b;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .loading span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #5ad1e5;
          animation: pulse 1.4s infinite;
        }

        .loading span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? "..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
