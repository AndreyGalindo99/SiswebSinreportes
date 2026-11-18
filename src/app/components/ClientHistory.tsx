import { CheckCircle2, FileText, Search, UserRound } from "lucide-react";
import { useState } from "react";

export function ClientHistory() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(true);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(Boolean(query.trim()));
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Consulta unificada</p>
      <h1 className="mt-2 text-3xl font-extrabold text-primary">Historial del cliente</h1>
      <p className="mt-2 text-sm text-muted-foreground">Busca por número de cédula para consultar el expediente completo.</p>
      <form onSubmit={handleSearch} className="mt-7 flex max-w-2xl gap-2 rounded-lg border border-border bg-white p-2 shadow-sm">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ej. 1.023.456.789" className="w-full rounded-md bg-muted/50 py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-accent" /></div>
        <button className="rounded-md bg-primary px-5 text-sm font-bold text-white hover:bg-slate-800">Consultar</button>
      </form>

      {searched && (
        <div className="mt-8 max-w-6xl">
          <div className="grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-primary p-7 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent"><UserRound className="h-6 w-6" /></div>
              <h2 className="mt-6 text-2xl font-bold">Juan Pérez Gómez</h2>
              <p className="mt-1 font-mono text-xs text-slate-400">CC 1.023.456.789 · CASO 001234</p>
              <dl className="mt-8 space-y-5 text-sm">
                <div><dt className="text-slate-400">Abogada asignada</dt><dd className="mt-1 font-semibold">Ana García</dd></div>
                <div><dt className="text-slate-400">Oficina</dt><dd className="mt-1 font-semibold">Bogotá · Sede principal</dd></div>
                <div><dt className="text-slate-400">Estado actual</dt><dd className="mt-1 font-semibold text-emerald-300">Fase 3 de 10 · En proceso</dd></div>
              </dl>
            </div>
            <div className="p-7">
              <div className="grid gap-px overflow-hidden rounded-md bg-border sm:grid-cols-3">
                {[["Valor del proceso", "$2.500.000"], ["Método de pago", "Mensual"], ["Pagado a la fecha", "$1.500.000"]].map(([label, value]) => <div key={label} className="bg-white p-5"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-bold text-primary">{value}</p></div>)}
              </div>
              <h3 className="mt-7 font-bold text-primary">Documentos cargados</h3>
              <div className="mt-3 divide-y divide-border rounded-md border border-border">
                {["Contrato de prestación de servicios.pdf", "Autorización de datos.pdf", "Consulta inicial.pdf", "Cédula de ciudadanía.pdf"].map((doc, i) => (
                  <div key={doc} className="flex items-center justify-between p-3.5 text-sm"><span className="flex items-center gap-3"><FileText className="h-4 w-4 text-accent" />{doc}</span><span className="text-xs text-muted-foreground">{i < 2 ? "15 Ene 2026" : "16 Ene 2026"}</span></div>
                ))}
              </div>
              <h3 className="mt-7 font-bold text-primary">Pagos realizados</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {["15 Ene · $500.000", "15 Feb · $500.000", "15 Mar · $500.000"].map((pay) => <div key={pay} className="flex items-center gap-2 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-800"><CheckCircle2 className="h-4 w-4" />{pay}</div>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
