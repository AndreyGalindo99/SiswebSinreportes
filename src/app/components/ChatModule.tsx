import { Send, Paperclip, Check, CheckCheck, Phone, Video, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Message {
  id: number;
  sender: 'client' | 'lawyer';
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

export function ChatModule({ userRole }: { userRole: string }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'lawyer',
      text: 'Hola Juan, he revisado tu documentación y todo está en orden.',
      time: '10:30',
      status: 'read',
    },
    {
      id: 2,
      sender: 'client',
      text: 'Gracias Ana, ¿cuál es el siguiente paso?',
      time: '10:32',
      status: 'read',
    },
    {
      id: 3,
      sender: 'lawyer',
      text: 'Ahora vamos a presentar la disputa formal ante la entidad crediticia. Debería tomar entre 15 a 30 días hábiles.',
      time: '10:35',
      status: 'read',
    },
    {
      id: 4,
      sender: 'client',
      text: 'Perfecto, ¿necesitas algo más de mi parte?',
      time: '10:40',
      status: 'read',
    },
    {
      id: 5,
      sender: 'lawyer',
      text: 'No por el momento. Te mantendré informado de cualquier actualización. Si surge algo, te contactaré de inmediato.',
      time: '14:15',
      status: 'read',
    },
    {
      id: 6,
      sender: 'client',
      text: 'Excelente, quedo atento. Muchas gracias por todo.',
      time: '14:20',
      status: 'delivered',
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: userRole === 'abogado' ? 'lawyer' : 'client',
        text: message,
        time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'read') return <CheckCheck className="w-4 h-4 text-blue-500" />;
    if (status === 'delivered') return <CheckCheck className="w-4 h-4 text-slate-400" />;
    return <Check className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl text-slate-900 mb-2">Chat</h1>
        <p className="text-slate-600">Comunicación directa con tu {userRole === 'abogado' ? 'cliente' : 'abogado'}</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col max-w-5xl mx-auto w-full">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-green-600 rounded-full flex items-center justify-center text-white">
              {userRole === 'abogado' ? 'JP' : 'AG'}
            </div>
            <div>
              <h2 className="text-lg text-slate-900">
                {userRole === 'abogado' ? 'Juan Pérez' : 'Ana García'}
              </h2>
              <p className="text-sm text-accent">En línea</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => toast.info("Iniciando llamada...")} className="w-10 h-10 hover:bg-slate-100 rounded-lg flex items-center justify-center transition">
              <Phone className="w-5 h-5 text-slate-600" />
            </button>
            <button onClick={() => toast.info("Iniciando videollamada...")} className="w-10 h-10 hover:bg-slate-100 rounded-lg flex items-center justify-center transition">
              <Video className="w-5 h-5 text-slate-600" />
            </button>
            <button onClick={() => toast.info("Más opciones")} className="w-10 h-10 hover:bg-slate-100 rounded-lg flex items-center justify-center transition">
              <MoreVertical className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          <div className="text-center">
            <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full">13 Mayo 2026</span>
          </div>

          {messages.map((msg) => {
            const isOwnMessage =
              (userRole === 'abogado' && msg.sender === 'lawyer') ||
              (userRole !== 'abogado' && msg.sender === 'client');

            return (
              <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      isOwnMessage
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-white text-slate-900 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-slate-500">{msg.time}</span>
                    {isOwnMessage && getStatusIcon(msg.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-3">
            <button onClick={() => toast.info("Adjuntar archivo seleccionado")} className="w-10 h-10 hover:bg-slate-100 rounded-lg flex items-center justify-center transition flex-shrink-0">
              <Paperclip className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Escribe un mensaje..."
                className="w-full px-4 py-3 bg-slate-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent resize-none max-h-32"
                rows={1}
              />
            </div>

            <button
              onClick={handleSend}
              className="w-10 h-10 bg-accent hover:bg-green-700 rounded-lg flex items-center justify-center transition flex-shrink-0"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
