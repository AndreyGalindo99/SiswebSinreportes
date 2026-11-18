import { Building2, MapPin, Pencil, Plus, Scale, Trash2, UserRound, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Office { id: number; name: string; location: string; manager: string; lawyer: string }

const managers = ["Natalia Méndez", "Julián Restrepo", "Paola Valencia", "Andrea Salcedo", "Mauricio León"];
const lawyers = ["Ana García", "Carlos Ruiz", "Roberto Sánchez", "Lucía Paredes"];

const seed: Office[] = [
  { id: 1, name: "Bogotá · Sede principal", location: "Calle 93B # 18–12, Oficina 402", manager: "Natalia Méndez", lawyer: "Ana García" },
  { id: 2, name: "Medellín", location: "Carrera 43A # 1–50, El Poblado", manager: "Julián Restrepo", lawyer: "Carlos Ruiz" },
  { id: 3, name: "Cali", location: "Avenida 6N # 24N–17, Oficina 301", manager: "Paola Valencia", lawyer: "Roberto Sánchez" },
  { id: 4, name: "Barranquilla", location: "Carrera 53 # 80–67, Alto Prado", manager: "Andrea Salcedo", lawyer: "Lucía Paredes" },
  { id: 5, name: "Oficina Digital", location: "Cobertura nacional · Atención remota", manager: "Mauricio León", lawyer: "Ana García" },
];

const empty = { name: "", location: "", manager: managers[0], lawyer: lawyers[0] };

export function ManageOffices() {
  const [offices, setOffices] = useState<Office[]>(seed);
  const [editing, setEditing] = useState<Office | null>(null);
  const [form, setForm] = useState(empty);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Office | null>(null);

  const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (o: Office) => { setEditing(o); setForm({ name: o.name, location: o.location, manager: o.manager, lawyer: o.lawyer }); setOpen(true); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setOffices((list) => list.map((o) => (o.id === editing.id ? { ...o, ...form } : o)));
      toast.success("Oficina actualizada");
    } else {
      setOffices((list) => [...list, { id: Date.now(), ...form }]);
      toast.success("Oficina creada");
    }
    setOpen(false);
  };

  const remove = () => {
    if (!toDelete) return;
    setOffices((list) => list.filter((o) => o.id !== toDelete.id));
    toast.success(`Oficina ${toDelete.name} eliminada`);
    setToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Administración</p>
          <h1 className="mt-2 text-3xl font-extrabold text-primary">Administrar oficinas</h1>
          <p className="mt-2 text-sm text-muted-foreground">{offices.length} oficinas registradas a nivel nacional.</p>
        </div>
        <button onClick={openCreate} className="flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"><Plus className="h-4 w-4" />Nueva oficina</button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offices.map((o) => (
          <article key={o.id} className="flex flex-col rounded-lg border border-border bg-white p-6 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white"><Building2 className="h-5 w-5" /></div>
              <div className="flex gap-1"><button title="Editar" onClick={() => openEdit(o)} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary"><Pencil className="h-4 w-4" /></button><button title="Eliminar" onClick={() => setToDelete(o)} className="rounded-md p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div>
            </div>
            <h2 className="mt-5 text-lg font-bold text-primary">{o.name}</h2>
            <p className="mt-2 flex gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{o.location}</p>
            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <p className="flex items-center gap-2"><UserRound className="h-4 w-4 text-accent" /><span className="text-muted-foreground">Gerente:</span><span className="font-bold">{o.manager}</span></p>
              <p className="flex items-center gap-2"><Scale className="h-4 w-4 text-accent" /><span className="text-muted-foreground">Abogado:</span><span className="font-bold">{o.lawyer}</span></p>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm">
          <form onSubmit={save} className="w-full max-w-lg rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-border p-6">
              <div><p className="font-mono text-xs uppercase tracking-wider text-accent">{editing ? "Edición" : "Alta"}</p><h2 className="mt-1 text-xl font-extrabold text-primary">{editing ? "Actualizar oficina" : "Crear oficina"}</h2></div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-5 p-6">
              <label className="block"><span className="mb-2 block text-sm font-bold">Nombre de la oficina</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" placeholder="Ej. Bucaramanga" /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Ubicación</span><input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="form-input" placeholder="Dirección y ciudad" /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Gerente a cargo</span><select value={form.manager} onChange={(e) => setForm({ ...form, manager: e.target.value })} className="form-input">{managers.map((m) => <option key={m}>{m}</option>)}</select></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Abogado a cargo</span><select value={form.lawyer} onChange={(e) => setForm({ ...form, lawyer: e.target.value })} className="form-input">{lawyers.map((l) => <option key={l}>{l}</option>)}</select></label>
            </div>
            <div className="flex justify-end gap-3 border-t border-border p-5"><button type="button" onClick={() => setOpen(false)} className="rounded-md border border-border px-4 py-2 text-sm font-bold">Cancelar</button><button className="rounded-md bg-accent px-5 py-2 text-sm font-bold text-white">{editing ? "Guardar cambios" : "Crear oficina"}</button></div>
          </form>
        </div>
      )}

      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-extrabold text-primary">¿Eliminar oficina?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Se eliminará <span className="font-bold text-foreground">{toDelete.name}</span>. Esta acción no se puede deshacer.</p>
            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setToDelete(null)} className="rounded-md border border-border px-4 py-2 text-sm font-bold">Cancelar</button><button onClick={remove} className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">Eliminar</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
