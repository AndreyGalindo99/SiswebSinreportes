import { toast } from "sonner";
import { AlertTriangle, Download, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

const rows = [
  { client: "María López", id: "52.441.893", status: "En mora", method: "Mensual", office: "Bogotá", lawyer: "Ana García", balance: "$500.000" },
  { client: "Pedro González", id: "79.220.145", status: "Al día", method: "50/50", office: "Medellín", lawyer: "Carlos Ruiz", balance: "$0" },
  { client: "Laura Martínez", id: "1.098.443.210", status: "En mora", method: "Quincenal", office: "Cali", lawyer: "Roberto Sánchez", balance: "$250.000" },
  { client: "Carlos Hernández", id: "91.772.008", status: "Pendiente", method: "Abonos parciales", office: "Digital", lawyer: "Ana García", balance: "$800.000" },
  { client: "Daniela Rojas", id: "1.018.552.903", status: "Al día", method: "Mensual", office: "Barranquilla", lawyer: "Carlos Ruiz", balance: "$0" },
];

export function AdminPayments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [office, setOffice] = useState("Todas");
  const filtered = useMemo(() => rows.filter((row) =>
    (row.client.toLowerCase().includes(search.toLowerCase()) || row.id.includes(search)) &&
    (status === "Todos" || row.status === status) &&
    (office === "Todas" || row.office === office)
  ), [search, status, office]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Control de cartera</p><h1 className="mt-2 text-3xl font-extrabold text-primary">Panel de pagos</h1><p className="mt-2 text-sm text-muted-foreground">Filtra cartera por estado, oficina, método y responsable.</p></div>
        <button onClick={() => toast.success(`Cartera exportada · ${filtered.length} registros`)} className="flex w-fit items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-bold"><Download className="h-4 w-4" />Exportar cartera</button>
      </div>
      <div className="mt-8 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-3">
        {[["Cartera recaudada", "$184.250.000"], ["Saldo pendiente", "$24.800.000"], ["Clientes en mora", "18"]].map(([label, value], i) => <div key={label} className="bg-white p-6"><p className="text-xs text-muted-foreground">{label}</p><p className={`mt-2 text-2xl font-extrabold ${i === 2 ? "text-amber-600" : "text-primary"}`}>{value}</p></div>)}
      </div>
      <div className="mt-6 rounded-lg border border-border bg-white">
        <div className="flex flex-wrap gap-3 border-b border-border p-4">
          <div className="relative min-w-64 flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar cliente o cédula" className="w-full rounded-md bg-muted/60 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent" /></div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="h-4 w-4" /><select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-border bg-white px-3 py-2 text-foreground"><option>Todos</option><option>En mora</option><option>Pendiente</option><option>Al día</option></select></label>
          <select value={office} onChange={(e) => setOffice(e.target.value)} className="rounded-md border border-border bg-white px-3 py-2 text-sm"><option>Todas</option><option>Bogotá</option><option>Medellín</option><option>Cali</option><option>Barranquilla</option><option>Digital</option></select>
          <select className="rounded-md border border-border bg-white px-3 py-2 text-sm"><option>Todos los métodos</option><option>Mensual</option><option>Quincenal</option><option>Abonos parciales</option><option>50/50</option></select>
          <select className="rounded-md border border-border bg-white px-3 py-2 text-sm"><option>Todos los abogados</option><option>Ana García</option><option>Carlos Ruiz</option><option>Roberto Sánchez</option></select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-muted/50 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><tr>{["Cliente", "Estado", "Método", "Oficina", "Abogado", "Saldo"].map((h) => <th key={h} className="px-5 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">{filtered.map((row) => <tr key={row.id} className="hover:bg-muted/30"><td className="px-5 py-4 font-bold text-primary">{row.client}<span className="block font-mono text-[11px] font-normal text-muted-foreground">{row.id}</span></td><td className="px-5 py-4"><span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${row.status === "En mora" ? "bg-amber-100 text-amber-800" : row.status === "Al día" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>{row.status === "En mora" && <AlertTriangle className="h-3 w-3" />}{row.status}</span></td><td className="px-5 py-4">{row.method}</td><td className="px-5 py-4">{row.office}</td><td className="px-5 py-4">{row.lawyer}</td><td className="px-5 py-4 font-bold">{row.balance}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
