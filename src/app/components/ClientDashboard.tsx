import { CheckCircle2, Clock, FileText, Bell, TrendingUp } from 'lucide-react';

export function ClientDashboard({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const phases = [
    { id: 1, name: 'Fase 1: Análisis Inicial', status: 'completed', date: '15 Ene 2026' },
    { id: 2, name: 'Fase 2: Recopilación de Evidencias', status: 'completed', date: '22 Ene 2026' },
    { id: 3, name: 'Fase 3: Presentación Legal', status: 'in-progress', date: 'En proceso' },
    { id: 4, name: 'Fase 4: Seguimiento Crediticio', status: 'pending', date: 'Pendiente' },
    { id: 5, name: 'Fase 5: Respuesta de la Entidad', status: 'pending', date: 'Pendiente' },
    { id: 6, name: 'Fase 6: Revisión Jurídica', status: 'pending', date: 'Pendiente' },
    { id: 7, name: 'Fase 7: Requerimiento Final', status: 'pending', date: 'Pendiente' },
    { id: 8, name: 'Fase 8: Verificación en Centrales', status: 'pending', date: 'Pendiente' },
    { id: 9, name: 'Fase 9: Validación con Cliente', status: 'pending', date: 'Pendiente' },
    { id: 10, name: 'Fase 10: Cierre del Caso', status: 'pending', date: 'Pendiente' },
  ];

  const stats = [
    { label: 'Días en Proceso', value: '28', icon: Clock, color: 'bg-blue-500' },
    { label: 'Documentos Cargados', value: '12', icon: FileText, color: 'bg-accent' },
    { label: 'Fase Actual', value: '3/10', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const notifications = [
    { id: 1, text: 'Su abogado ha actualizado el estado del caso', time: 'Hace 2 horas', unread: true },
    { id: 2, text: 'Nueva evidencia requerida para la Fase 3', time: 'Hace 5 horas', unread: true },
    { id: 3, text: 'Pago mensual procesado correctamente', time: 'Ayer', unread: false },
    { id: 4, text: 'Recordatorio: Reunión programada para el 16 de Mayo', time: 'Hace 2 días', unread: false },
  ];

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl text-slate-900 mb-2">Bienvenido de nuevo</h1>
        <p className="text-slate-600">Aquí está el resumen de tu caso</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl text-slate-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-slate-900">Línea de Tiempo del Caso</h2>
            <button onClick={() => onNavigate?.("evidence")} className="text-accent hover:text-green-700 text-sm">Ver Evidencias</button>
          </div>

          <div className="space-y-4">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  {phase.status === 'completed' ? (
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  ) : phase.status === 'in-progress' ? (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                    </div>
                  )}
                  {index < phases.length - 1 && (
                    <div className={`w-0.5 h-12 ${phase.status === 'completed' ? 'bg-accent' : 'bg-slate-200'}`}></div>
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between">
                    <h3 className={`${phase.status === 'in-progress' ? 'text-slate-900' : 'text-slate-700'}`}>
                      {phase.name}
                    </h3>
                    <span className={`text-sm ${phase.status === 'completed' ? 'text-accent' : 'text-slate-500'}`}>
                      {phase.date}
                    </span>
                  </div>
                  {phase.status === 'in-progress' && (
                    <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-slate-900">Notificaciones</h2>
            <Bell className="w-5 h-5 text-slate-400" />
          </div>

          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg border ${
                  notif.unread ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className={`text-sm ${notif.unread ? 'text-slate-900' : 'text-slate-600'} mb-1`}>
                  {notif.text}
                </p>
                <p className="text-xs text-slate-500">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
