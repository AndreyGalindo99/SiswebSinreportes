import { toast } from "sonner";
import { User, Mail, Phone, Calendar, CheckCircle, Clock, AlertCircle, FileText, Search, X, Save } from "lucide-react";
import { useState } from 'react';

export function LawyerCase() {
  const [selectedPhase, setSelectedPhase] = useState(3);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState("Juan Pérez Gómez");
  const [showUpdate, setShowUpdate] = useState(false);
  const [newPhase, setNewPhase] = useState(3);
  const [observation, setObservation] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [note, setNote] = useState("");

  const clients = [
    { name: "Juan Pérez Gómez", id: "1.023.456.789", phase: 3, status: "En proceso" },
    { name: "María López Torres", id: "52.441.893", phase: 5, status: "En revisión" },
    { name: "Pedro González Ruiz", id: "79.220.145", phase: 2, status: "En proceso" },
    { name: "Laura Martínez Díaz", id: "1.098.443.210", phase: 4, status: "Respuesta recibida" },
    { name: "Daniela Rojas", id: "1.018.552.903", phase: 8, status: "En proceso" },
  ];

  const clientInfo = {
    name: 'Juan Pérez Gómez',
    email: 'juan.perez@email.com',
    phone: '+52 55 1234 5678',
    caseNumber: 'CASE-2026-001234',
    startDate: '15 Enero 2026',
    assignedLawyer: 'Ana García',
  };

  const phases = [
    {
      id: 1,
      name: 'Análisis Inicial',
      status: 'completed',
      completedDate: '15 Ene 2026',
      notes: 'Análisis completo del reporte crediticio. Se identificaron 3 elementos negativos.',
    },
    {
      id: 2,
      name: 'Recopilación de Evidencias',
      status: 'completed',
      completedDate: '22 Ene 2026',
      notes: 'Cliente proporcionó toda la documentación necesaria.',
    },
    {
      id: 3,
      name: 'Presentación Legal',
      status: 'in-progress',
      completedDate: null,
      notes: 'En espera de respuesta de la entidad crediticia. Plazo: 30 días hábiles.',
    },
    {
      id: 4,
      name: 'Seguimiento Crediticio',
      status: 'pending',
      completedDate: null,
      notes: null,
    },
    {
      id: 5,
      name: 'Respuesta de la Entidad',
      status: 'pending',
      completedDate: null,
      notes: null,
    },
    { id: 6, name: "Revisión Jurídica", status: "pending", completedDate: null, notes: null },
    { id: 7, name: "Requerimiento Final", status: "pending", completedDate: null, notes: null },
    { id: 8, name: "Verificación en Centrales", status: "pending", completedDate: null, notes: null },
    { id: 9, name: "Validación con Cliente", status: "pending", completedDate: null, notes: null },
    { id: 10, name: "Cierre del Caso", status: "pending", completedDate: null, notes: null },
  ];

  const actions = [
    { date: '13 May 2026', time: '10:30', action: 'Nota interna agregada por Ana García', type: 'note' },
    { date: '12 May 2026', time: '14:15', action: 'Estado actualizado a "Fase 3 - En Progreso"', type: 'status' },
    { date: '10 May 2026', time: '09:00', action: 'Evidencia "Acuerdo Legal.pdf" cargada', type: 'upload' },
    { date: '08 May 2026', time: '16:45', action: 'Reunión con cliente completada', type: 'meeting' },
    { date: '05 May 2026', time: '11:20', action: 'Documento enviado a entidad crediticia', type: 'document' },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'completed') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          <CheckCircle className="w-4 h-4" />
          Completado
        </span>
      );
    }
    if (status === 'in-progress') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          <Clock className="w-4 h-4" />
          En Progreso
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
        <AlertCircle className="w-4 h-4" />
        Pendiente
      </span>
    );
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Cartera asignada</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Gestión de Casos</h1>
        <p className="mt-2 text-slate-600">Consulta tus clientes y actualiza el avance de cada proceso.</p>
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div><h2 className="font-bold text-primary">Clientes asignados</h2><p className="text-sm text-muted-foreground">{clients.length} expedientes activos</p></div>
          <div className="relative w-full md:w-80"><Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Nombre o número de cédula" className="w-full rounded-md border border-input bg-input-background py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent" /></div>
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-5">
          {clients.filter((client) => `${client.name} ${client.id}`.toLowerCase().includes(search.toLowerCase())).map((client) => (
            <button key={client.id} onClick={() => setSelectedClient(client.name)} className={`rounded-md border p-3 text-left transition ${selectedClient === client.name ? "border-accent bg-emerald-50" : "border-border hover:border-slate-400"}`}>
              <span className="block truncate text-sm font-bold text-primary">{client.name}</span>
              <span className="mt-1 block font-mono text-[10px] text-muted-foreground">CC {client.id}</span>
              <span className="mt-3 inline-flex rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">FASE {client.phase} · {client.status}</span>
            </button>
          ))}
        </div>
      </div>

      {savedMessage && <div className="mb-5 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">{savedMessage}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl text-slate-900 mb-6">Información del Cliente</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
                JP
              </div>
              <div>
                <h3 className="text-slate-900">{selectedClient}</h3>
                <p className="text-sm text-slate-600">{clientInfo.caseNumber}</p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-slate-400" />
                <span className="text-slate-700">{clientInfo.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-slate-400" />
                <span className="text-slate-700">{clientInfo.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span className="text-slate-700">Inicio: {clientInfo.startDate}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <User className="w-5 h-5 text-slate-400" />
                <span className="text-slate-700">Abogado: {clientInfo.assignedLawyer}</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="rounded-md bg-slate-50 p-3 text-sm text-muted-foreground">Contacto disponible por teléfono y correo registrados.</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-slate-900">Fases del Proceso</h2>
              <button onClick={() => setShowUpdate(true)} className="bg-primary hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm transition">
                Actualizar Estado
              </button>
            </div>

            <div className="space-y-4">
              {phases.map((phase) => (
                <div
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                    selectedPhase === phase.id
                      ? 'border-accent bg-green-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-600">Fase {phase.id}</span>
                      <h3 className="text-slate-900">{phase.name}</h3>
                    </div>
                    {getStatusBadge(phase.status)}
                  </div>

                  {phase.completedDate && (
                    <p className="text-sm text-slate-600 mb-2">Completado: {phase.completedDate}</p>
                  )}

                  {phase.notes && (
                    <p className="text-sm text-slate-700 bg-slate-50 rounded p-3">{phase.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl text-slate-900 mb-6">Historial de Acciones</h2>

            <div className="space-y-3">
              {actions.map((action, index) => (
                <div key={index} className="flex items-start gap-4 pb-3 border-b border-slate-100 last:border-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">{action.action}</p>
                    <p className="text-xs text-slate-500">
                      {action.date} - {action.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl text-slate-900 mb-4">Notas Internas</h2>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Agregar nota interna sobre el caso..."
              className="w-full h-32 px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />

            <div className="mt-4 flex justify-end">
              <button onClick={() => { if (!note.trim()) { toast.error("Escribe una nota antes de guardar"); return; } toast.success("Nota interna guardada"); setNote(""); }} className="bg-primary hover:bg-slate-800 text-white px-6 py-2 rounded-lg transition">
                Guardar Nota
              </button>
            </div>
          </div>
        </div>
      </div>

      {showUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); setSelectedPhase(newPhase); setSavedMessage(`Estado actualizado a Fase ${newPhase}. La observación quedó registrada en el historial.`); setShowUpdate(false); }} className="w-full max-w-lg rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-border p-6">
              <div><p className="font-mono text-xs uppercase tracking-wider text-accent">Solo abogado</p><h2 className="mt-1 text-xl font-extrabold text-primary">Actualizar fase del proceso</h2><p className="mt-1 text-sm text-muted-foreground">{selectedClient}</p></div>
              <button type="button" onClick={() => setShowUpdate(false)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-5 p-6">
              <label className="block"><span className="mb-2 block text-sm font-bold">Nueva fase</span><select value={newPhase} onChange={(e) => setNewPhase(Number(e.target.value))} className="form-input">{Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={index + 1}>Fase {index + 1}</option>)}</select></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Observación obligatoria</span><textarea required value={observation} onChange={(e) => setObservation(e.target.value)} rows={5} placeholder="Describe el avance, respuesta recibida o siguiente acción..." className="form-input resize-none" /></label>
            </div>
            <div className="flex justify-end gap-3 border-t border-border p-5"><button type="button" onClick={() => setShowUpdate(false)} className="rounded-md border border-border px-4 py-2 text-sm font-bold">Cancelar</button><button className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-bold text-white"><Save className="h-4 w-4" />Guardar actualización</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
