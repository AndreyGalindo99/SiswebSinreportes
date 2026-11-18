import { toast } from "sonner";
import { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor ingrese un correo válido');
      return;
    }

    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-2xl text-slate-900 mb-2">SisWeb-SinReportes</h1>
            <p className="text-slate-500">Eliminación de Reportes Negativos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm text-slate-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-slate-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm text-slate-700 mb-2">
                Tipo de Usuario
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              >
                <option value="cliente">Cliente</option>
                <option value="abogado">Abogado</option>
                <option value="gerente">Gerente</option>
                <option value="dueño">Dueño</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-slate-800 text-white py-3 rounded-lg transition duration-200 shadow-lg shadow-slate-900/20"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <a href="#" onClick={(e) => { e.preventDefault(); toast.success("Te enviamos instrucciones para restablecer tu contraseña."); }} className="text-sm text-accent hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          © 2026 SisWeb-SinReportes. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
