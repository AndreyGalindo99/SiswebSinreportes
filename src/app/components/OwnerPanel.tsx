import { toast } from "sonner";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, Award, Download, CheckCircle2 } from "lucide-react";

export function OwnerPanel() {
  const metrics = [
    { label: 'Ingresos del Mes', value: '$284,500', change: '+18%', icon: DollarSign, color: 'bg-accent' },
    { label: 'Total Clientes', value: '356', change: '+24', icon: Users, color: 'bg-blue-500' },
    { label: 'Tasa de Éxito', value: '94.5%', change: '+2.1%', icon: Award, color: 'bg-purple-500' },
    { label: 'Procesos Finalizados', value: '128', change: '+14', icon: CheckCircle2, color: 'bg-orange-500' },
  ];

  const monthlyRevenue = [
    { month: 'Ene', revenue: 245000, cases: 38 },
    { month: 'Feb', revenue: 268000, cases: 42 },
    { month: 'Mar', revenue: 292000, cases: 45 },
    { month: 'Abr', revenue: 275000, cases: 40 },
    { month: 'May', revenue: 284500, cases: 43 },
  ];

  const casesByPhase = [
    { name: 'Fase 1', value: 12, color: '#0f172a' },
    { name: 'Fase 2', value: 18, color: '#1e40af' },
    { name: 'Fase 3', value: 25, color: '#10b981' },
    { name: 'Fase 4', value: 15, color: '#64748b' },
    { name: 'Fase 5', value: 8, color: '#0891b2' },
  ];

  const performanceData = [
    { month: 'Ene', satisfaccion: 92, eficiencia: 88, retencion: 95 },
    { month: 'Feb', satisfaccion: 93, eficiencia: 90, retencion: 96 },
    { month: 'Mar', satisfaccion: 94, eficiencia: 91, retencion: 94 },
    { month: 'Abr', satisfaccion: 93, eficiencia: 89, retencion: 97 },
    { month: 'May', satisfaccion: 95, eficiencia: 92, retencion: 98 },
  ];

  const topLawyers = [
    { name: 'Ana García', cases: 45, successRate: 96, revenue: '$82,400' },
    { name: 'Carlos Ruiz', cases: 38, successRate: 94, revenue: '$71,200' },
    { name: 'Roberto Sánchez', cases: 32, successRate: 95, revenue: '$68,900' },
  ];

  const officePerformance = [
    { office: "Bogotá", manager: "Natalia Méndez", clients: 124, collected: "$96.400.000", completed: 46, goal: 108 },
    { office: "Medellín", manager: "Julián Restrepo", clients: 82, collected: "$61.850.000", completed: 31, goal: 96 },
    { office: "Cali", manager: "Paola Valencia", clients: 61, collected: "$44.200.000", completed: 22, goal: 91 },
    { office: "Barranquilla", manager: "Andrea Salcedo", clients: 47, collected: "$35.600.000", completed: 17, goal: 88 },
    { office: "Digital", manager: "Mauricio León", clients: 42, collected: "$46.450.000", completed: 12, goal: 102 },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-slate-900 mb-2">Panel Ejecutivo</h1>
            <p className="text-slate-600">Vista general del negocio y métricas clave</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm">
              <option>Último mes</option>
              <option>Últimos 3 meses</option>
              <option>Últimos 6 meses</option>
              <option>Este año</option>
            </select>
            <button onClick={() => toast.success("Reporte ejecutivo exportado")} className="bg-primary hover:bg-slate-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition">
              <Download className="w-4 h-4" />
              Exportar Reportes
            </button>
          </div>
        </div>
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

      <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-200 p-6 md:flex-row md:items-end">
          <div><p className="font-mono text-xs uppercase tracking-wider text-accent">Comparativo nacional</p><h2 className="mt-1 text-xl font-bold text-slate-900">Desempeño por oficinas</h2></div>
          <p className="text-sm text-muted-foreground">Recaudo consolidado: <span className="font-bold text-primary">$284.500.000</span></p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-slate-50 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><tr>{["Oficina", "Gerente", "Clientes activos", "Total recaudado", "Procesos finalizados", "Meta"].map((title) => <th key={title} className="px-6 py-3">{title}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">{officePerformance.map((office) => <tr key={office.office} className="hover:bg-slate-50"><td className="px-6 py-4 font-bold text-primary">{office.office}</td><td className="px-6 py-4 text-muted-foreground">{office.manager}</td><td className="px-6 py-4">{office.clients}</td><td className="px-6 py-4 font-bold">{office.collected}</td><td className="px-6 py-4"><span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="h-4 w-4" />{office.completed}</span></td><td className="px-6 py-4"><span className={`font-bold ${office.goal >= 100 ? "text-accent" : "text-amber-600"}`}>{office.goal}%</span></td></tr>)}</tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl text-slate-900 mb-6">Ingresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl text-slate-900 mb-6">Distribución de Casos por Fase</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={casesByPhase}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {casesByPhase.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl text-slate-900 mb-6">Indicadores de Desempeño</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="satisfaccion" stroke="#10b981" strokeWidth={2} name="Satisfacción %" />
              <Line type="monotone" dataKey="eficiencia" stroke="#1e40af" strokeWidth={2} name="Eficiencia %" />
              <Line type="monotone" dataKey="retencion" stroke="#0891b2" strokeWidth={2} name="Retención %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl text-slate-900 mb-6">Top Abogados</h2>

          <div className="space-y-4">
            {topLawyers.map((lawyer, index) => (
              <div key={lawyer.name} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent to-green-600 rounded-full flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-slate-900">{lawyer.name}</h3>
                      <p className="text-sm text-slate-600">{lawyer.cases} casos</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <p className="text-xs text-slate-600">Tasa Éxito</p>
                    <p className="text-lg text-accent">{lawyer.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Ingresos</p>
                    <p className="text-lg text-slate-900">{lawyer.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
