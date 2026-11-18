import { toast } from "sonner";
import { User, Mail, Phone, Lock, Bell, Shield, Save } from 'lucide-react';
import { useState } from 'react';

export function ProfileModule() {
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl text-slate-900 mb-2">Mi Perfil</h1>
        <p className="text-slate-600">Administra tu información personal y preferencias</p>
      </div>

      <div className="max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl flex-shrink-0">
              JP
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-slate-900 mb-2">Juan Pérez Gómez</h2>
              <p className="text-slate-600 mb-4">Cliente desde Enero 2026</p>
              <button onClick={() => toast.info("Selector de imagen abierto")} className="text-accent hover:underline text-sm">Cambiar foto de perfil</button>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg text-slate-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Información Personal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Nombre Completo</label>
                <input
                  type="text"
                  defaultValue="Juan Pérez Gómez"
                  className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    defaultValue="juan.perez@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    defaultValue="+52 55 1234 5678"
                    className="w-full pl-10 pr-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Dirección</label>
                <input
                  type="text"
                  defaultValue="Av. Reforma 123, CDMX"
                  className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => toast.success("Cambios guardados")} className="bg-accent hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition">
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-6">
          <h3 className="text-lg text-slate-900 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Seguridad
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-700 mb-2">Contraseña Actual</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Nueva Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2">Confirmar Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Usa al menos 8 caracteres con una combinación de letras, números y símbolos
              </p>
            </div>

            <div className="flex justify-end">
              <button onClick={() => toast.success("Contraseña actualizada")} className="bg-primary hover:bg-slate-800 text-white px-6 py-3 rounded-lg transition">
                Actualizar Contraseña
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-lg text-slate-900 mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Preferencias de Notificación
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <h4 className="text-slate-900 mb-1">Notificaciones por Email</h4>
                <p className="text-sm text-slate-600">Recibe actualizaciones de tu caso por correo</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>

          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={() => toast.success("Preferencias guardadas")} className="bg-accent hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition">
              <Save className="w-5 h-5" />
              Guardar Preferencias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
