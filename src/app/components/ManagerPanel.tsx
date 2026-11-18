import { toast } from "sonner";
import { Search, Users, CheckCircle, Clock, TrendingUp, Calendar, Plus, Upload, X, FileCheck2 } from "lucide-react";
import { useMemo, useState } from "react";

export function ManagerPanel() {
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [createdClient, setCreatedClient] = useState(false);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [showAssign, setShowAssign] = useState(false);

  const metrics = [
    { label: 'Casos Activos', value: '42', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Casos Completados', value: '128', change: '+8%', icon: CheckCircle, color: 'bg-accent' },
    { label: 'Tiempo Promedio', value: '45d', change: '-5%', icon: Clock, color: 'bg-purple-500' },
    { label: 'Tasa de Éxito', value: '94%', change: '+2%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const cases = [
    {
      id: 'CASE-001234',
      client: 'Juan Pérez',
      lawyer: 'Ana García',
      phase: 'Fase 3',
      status: 'En Progreso',
      startDate: '15 Ene 2026',
      priority: 'Media',
    },
    {
      id: 'CASE-001235',
      client: 'María López',
      lawyer: 'Carlos Ruiz',
      phase: 'Fase 5',
      status: 'Completado',
      startDate: '10 Ene 2026',
      priority: 'Alta',
    },
    {
      id: 'CASE-001236',
      client: 'Pedro González',
      lawyer: 'Ana García',
      phase: 'Fase 2',
      status: 'En Progreso',
      startDate: '20 Ene 2026',
      priority: 'Baja',
    },
    {
      id: 'CASE-001237',
      client: 'Laura Martínez',
      lawyer: 'Roberto Sánchez',
      phase: 'Fase 4',
      status: 'En Progreso',
      startDate: '05 Feb 2026',
      priority: 'Alta',
    },
    {
      id: 'CASE-001238',
      client: 'Carlos Hernández',
      lawyer: 'Carlos Ruiz',
      phase: 'Fase 1',
      status: 'En Progreso',
      startDate: '01 May 2026',
      priority: 'Media',
    },
  ];

  const kpis = [
    { metric: 'Nuevos Casos (Mayo)', value: 18, target: 20, percentage: 90 },
    { metric: 'Casos Cerrados (Mayo)', value: 22, target: 20, percentage: 110 },
    { metric: 'Satisfacción Cliente', value: 4.7, target: 4.5, percentage: 104 },
    { metric: 'Tiempo Respuesta Promedio', value: '2.3h', target: '3h', percentage: 130 },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completado') return 'bg-green-100 text-green-700';
    if (status === 'En Progreso') return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-600';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'Alta') return 'bg-red-100 text-red-700';
    if (priority === 'Media') return 'bg-yellow-100 text-yellow-700';
    return 'bg-slate-100 text-slate-600';
  };

  const filteredCases = useMemo(() => cases.filter((item) => {
    const matchesSearch = `${item.client} ${item.id} ${item.lawyer}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todos" || (filterStatus === "en-progreso" && item.status === "En Progreso") || (filterStatus === "completado" && item.status === "Completado");
    return matchesSearch && matchesStatus;
  }), [searchTerm, filterStatus]);

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    setCreatedClient(true);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Operación de oficina</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Panel Administrativo</h1>
          <p className="mt-2 text-slate-600">Gestión y supervisión de todos los casos</p>
        </div>
        <button onClick={() => { setShowCreate(true); setCreatedClient(false); }} className="flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
          <Plus className="h-4 w-4" />Crear nuevo cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-accent">{metric.change}</span>
              </div>
              <p className="text-3xl text-slate-900 mb-1">{metric.value}</p>
              <p className="text-sm text-slate-600">{metric.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl text-slate-900">Lista de Casos</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar caso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                >
                  <option value="todos">Todos</option>
                  <option value="en-progreso">En Progreso</option>
                  <option value="completado">Completados</option>
                </select>
                <button onClick={() => setShowAssign(true)} className="bg-accent hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Asignar Caso
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">ID Caso</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Abogado</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Fase</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Prioridad</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-600 uppercase tracking-wider">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem.id} onClick={() => toast.info(`${caseItem.id} · ${caseItem.client} · ${caseItem.phase}`)} className="hover:bg-slate-50 cursor-pointer">
                    <td className="px-6 py-4 text-sm text-slate-900">{caseItem.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{caseItem.client}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{caseItem.lawyer}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{caseItem.phase}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(caseItem.priority)}`}>
                        {caseItem.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{caseItem.startDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl text-slate-900 mb-6">KPIs del Mes</h2>

          <div className="space-y-6">
            {kpis.map((kpi) => (
              <div key={kpi.metric}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-700">{kpi.metric}</p>
                  <span className="text-sm text-slate-900">
                    {kpi.value} / {kpi.target}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${kpi.percentage >= 100 ? 'bg-accent' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(kpi.percentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{kpi.percentage}% completado</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); setShowAssign(false); toast.success("Caso asignado correctamente"); }} className="w-full max-w-md rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-border p-6">
              <div><p className="font-mono text-xs uppercase tracking-wider text-accent">Distribución</p><h2 className="mt-1 text-xl font-extrabold text-primary">Asignar caso</h2></div>
              <button type="button" onClick={() => setShowAssign(false)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-5 p-6">
              <Field label="Caso"><select className="form-input">{cases.map((c) => <option key={c.id}>{c.id} · {c.client}</option>)}</select></Field>
              <Field label="Abogado"><select className="form-input"><option>Ana García</option><option>Carlos Ruiz</option><option>Roberto Sánchez</option></select></Field>
            </div>
            <div className="flex justify-end gap-3 border-t border-border p-5"><button type="button" onClick={() => setShowAssign(false)} className="rounded-md border border-border px-4 py-2 text-sm font-bold">Cancelar</button><button className="rounded-md bg-accent px-5 py-2 text-sm font-bold text-white">Asignar</button></div>
          </form>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-primary/70 p-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-border p-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent">Alta de expediente</p>
                <h2 className="mt-1 text-2xl font-extrabold text-primary">Crear nuevo cliente</h2>
                <p className="mt-1 text-sm text-muted-foreground">Registra la información personal y las condiciones del proceso.</p>
              </div>
              <button onClick={() => setShowCreate(false)} className="rounded-md p-2 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            {!createdClient ? (
              <form onSubmit={handleCreate} className="p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nombres y apellidos"><input required placeholder="Nombre completo" className="form-input" /></Field>
                  <Field label="Correo electrónico"><input required type="email" placeholder="cliente@correo.com" className="form-input" /></Field>
                  <Field label="Teléfono"><input required placeholder="+57 300 000 0000" className="form-input" /></Field>
                  <Field label="Oficina"><select className="form-input"><option>Bogotá · Sede principal</option><option>Medellín</option><option>Cali</option><option>Barranquilla</option><option>Oficina digital</option></select></Field>
                  <Field label="Tipo de documento"><select className="form-input"><option>Cédula de ciudadanía</option><option>Cédula de extranjería</option><option>Pasaporte</option><option>NIT</option></select></Field>
                  <Field label="Número de documento"><input required placeholder="1.023.456.789" className="form-input" /></Field>
                </div>
                <div className="my-6 border-t border-border" />
                <h3 className="mb-4 font-bold text-primary">Condiciones del proceso</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Costo total del proceso"><input required type="number" placeholder="$ 0 COP" className="form-input" /></Field>
                  <Field label="Método de pago"><select className="form-input"><option>MENSUAL</option><option>QUINCENAL</option><option>ABONOS PARCIALES</option><option>50/50</option></select></Field>
                  <Field label="Fecha del primer pago"><input required type="date" className="form-input" /></Field>
                  <Field label="Plazo acordado"><select className="form-input"><option>3 meses</option><option>6 meses</option><option>9 meses</option><option>12 meses</option></select></Field>
                  <Field label="Fase inicial"><input value="Fase 1" readOnly className="form-input bg-muted text-muted-foreground" /></Field>
                  <Field label="Abogado asignado"><select className="form-input"><option>Por asignar</option><option>Ana García</option><option>Carlos Ruiz</option><option>Roberto Sánchez</option></select></Field>
                </div>
                <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setShowCreate(false)} className="rounded-md border border-border px-5 py-2.5 text-sm font-bold">Cancelar</button><button className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white">Crear cliente y continuar</button></div>
              </form>
            ) : (
              <div className="p-6">
                <div className="flex gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"><FileCheck2 className="h-5 w-5 shrink-0" /><div><h3 className="font-bold">Cliente creado correctamente</h3><p className="text-sm">El expediente CASE-001239 está listo. Ahora puedes cargar la documentación inicial.</p></div></div>
                <h3 className="mt-7 font-bold text-primary">Documentación de vinculación</h3>
                <p className="mt-1 text-sm text-muted-foreground">Carga cada archivo en formato PDF, JPG o PNG.</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {["Contrato", "Formato de datos básicos", "Consulta inicial", "Documento de identidad"].map((document) => (
                    <label key={document} className="flex cursor-pointer items-center justify-between rounded-md border border-dashed border-border p-4 transition hover:border-accent hover:bg-emerald-50/50">
                      <span><span className="block text-sm font-bold text-primary">{document}</span><span className="text-xs text-muted-foreground">{uploaded.includes(document) ? "Archivo cargado" : "Seleccionar archivo"}</span></span>
                      {uploaded.includes(document) ? <CheckCircle className="h-5 w-5 text-accent" /> : <Upload className="h-5 w-5 text-muted-foreground" />}
                      <input type="file" className="hidden" onChange={() => setUploaded((current) => [...new Set([...current, document])])} />
                    </label>
                  ))}
                </div>
                <div className="mt-7 flex justify-end"><button onClick={() => setShowCreate(false)} className="rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-white">Finalizar registro</button></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>{children}</label>;
}
