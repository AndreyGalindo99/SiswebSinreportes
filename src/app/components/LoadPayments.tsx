import { Banknote, CheckCircle2, ImageUp, Landmark, Search, Smartphone, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ClientRecord {
  name: string;
  id: string;
  office: string;
  method: string;
  nextInstallment: number;
  totalInstallments: number;
  suggested: number;
  balance: number;
}

const clientsDb: ClientRecord[] = [
  { name: "Juan Pérez Gómez", id: "1023456789", office: "Bogotá", method: "Mensual", nextInstallment: 4, totalInstallments: 6, suggested: 500000, balance: 1000000 },
  { name: "María López Torres", id: "52441893", office: "Bogotá", method: "Quincenal", nextInstallment: 9, totalInstallments: 12, suggested: 250000, balance: 750000 },
  { name: "Laura Martínez Díaz", id: "1098443210", office: "Cali", method: "Quincenal", nextInstallment: 7, totalInstallments: 12, suggested: 250000, balance: 1250000 },
  { name: "Carlos Hernández", id: "91772008", office: "Digital", method: "Abonos parciales", nextInstallment: 2, totalInstallments: 5, suggested: 400000, balance: 1200000 },
];

const accounts = [
  { id: "Bancolombia", icon: Landmark, transfer: true },
  { id: "Nequi", icon: Smartphone, transfer: true },
  { id: "Daviplata", icon: Smartphone, transfer: true },
  { id: "Efectivo", icon: Banknote, transfer: false },
];

const money = (value: number) => `$${value.toLocaleString("es-CO")}`;

export function LoadPayments() {
  const [query, setQuery] = useState("");
  const [client, setClient] = useState<ClientRecord | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("Bancolombia");
  const [fileName, setFileName] = useState("");
  const [recent, setRecent] = useState<{ name: string; amount: number; account: string; installment: number; date: string }[]>([]);

  const today = new Date();
  const todayLabel = today.toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });
  const requiresProof = accounts.find((a) => a.id === account)?.transfer ?? false;

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const found = clientsDb.find((c) => c.id === query.replace(/\D/g, ""));
    setClient(found ?? null);
    setNotFound(!found);
    setAmount(found ? String(found.suggested) : "");
    setFileName("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client) return;
    if (requiresProof && !fileName) {
      toast.error("Adjunta la captura del pago para transferencias.");
      return;
    }
    const value = Number(amount);
    setRecent((r) => [{ name: client.name, amount: value, account, installment: client.nextInstallment, date: todayLabel }, ...r]);
    toast.success(`Pago de ${money(value)} registrado · Cuota ${client.nextInstallment}`);
    setClient({ ...client, nextInstallment: client.nextInstallment + 1, balance: Math.max(client.balance - value, 0) });
    setAmount("");
    setFileName("");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Recaudo</p>
      <h1 className="mt-2 text-3xl font-extrabold text-primary">Cargar pagos</h1>
      <p className="mt-2 text-sm text-muted-foreground">Busca al cliente por cédula y registra el pago recibido.</p>

      <form onSubmit={search} className="mt-7 flex max-w-2xl gap-2 rounded-lg border border-border bg-white p-2 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Número de cédula · prueba 1023456789" className="w-full rounded-md bg-muted/50 py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <button className="rounded-md bg-primary px-5 text-sm font-bold text-white hover:bg-slate-800">Buscar</button>
      </form>
      {notFound && <p className="mt-3 text-sm font-semibold text-amber-700">No se encontró un cliente con esa cédula.</p>}

      {client && (
        <div className="mt-8 grid max-w-6xl overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-primary p-7 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent"><UserRound className="h-6 w-6" /></div>
            <h2 className="mt-6 text-2xl font-bold">{client.name}</h2>
            <p className="mt-1 font-mono text-xs text-slate-400">CC {client.id}</p>
            <dl className="mt-8 space-y-5 text-sm">
              <div><dt className="text-slate-400">Oficina</dt><dd className="mt-1 font-semibold">{client.office}</dd></div>
              <div><dt className="text-slate-400">Método de pago</dt><dd className="mt-1 font-semibold">{client.method}</dd></div>
              <div><dt className="text-slate-400">Saldo pendiente</dt><dd className="mt-1 text-lg font-bold text-emerald-300">{money(client.balance)}</dd></div>
            </dl>
          </div>
          <form onSubmit={submit} className="space-y-5 p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block"><span className="mb-2 block text-sm font-bold">Número de cuota</span><input readOnly value={`${client.nextInstallment} de ${client.totalInstallments}`} className="form-input bg-muted text-muted-foreground" /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Fecha de pago</span><input readOnly value={todayLabel} className="form-input bg-muted text-muted-foreground" /></label>
            </div>
            <label className="block"><span className="mb-2 block text-sm font-bold">Valor del pago (COP)</span><input required type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} className="form-input" placeholder="500000" /></label>
            <div>
              <span className="mb-2 block text-sm font-bold">Cuenta donde se recibió</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {accounts.map((a) => {
                  const Icon = a.icon;
                  return (
                    <button type="button" key={a.id} onClick={() => setAccount(a.id)} className={`flex flex-col items-center gap-2 rounded-md border p-3 text-xs font-bold transition ${account === a.id ? "border-accent bg-emerald-50 text-primary" : "border-border text-muted-foreground hover:border-slate-400"}`}>
                      <Icon className="h-5 w-5" />{a.id}
                    </button>
                  );
                })}
              </div>
            </div>
            {requiresProof && (
              <label className="flex cursor-pointer items-center gap-4 rounded-md border-2 border-dashed border-border bg-muted/30 p-5 transition hover:border-accent">
                <ImageUp className="h-7 w-7 text-accent" />
                <span><span className="block text-sm font-bold text-primary">{fileName || "Cargar captura del pago"}</span><span className="text-xs text-muted-foreground">Obligatoria para transferencias · JPG, PNG o PDF</span></span>
                <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
              </label>
            )}
            <div className="flex justify-end"><button className="rounded-md bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Registrar pago</button></div>
          </form>
        </div>
      )}

      {recent.length > 0 && (
        <div className="mt-8 max-w-6xl">
          <h2 className="font-bold text-primary">Registrados en esta sesión</h2>
          <div className="mt-3 divide-y divide-border rounded-lg border border-border bg-white">
            {recent.map((p, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
                <span className="flex items-center gap-2 font-bold text-primary"><CheckCircle2 className="h-4 w-4 text-accent" />{p.name}</span>
                <span className="text-muted-foreground">Cuota {p.installment} · {p.account} · {p.date}</span>
                <span className="font-bold">{money(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
