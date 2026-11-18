import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Role = "Cliente" | "Abogado" | "Gerente" | "Dueño";
interface AppUser { id: number; name: string; document: string; email: string; phone: string; role: Role; office: string; active: boolean }

const offices = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Digital"];
const roles: Role[] = ["Cliente", "Abogado", "Gerente", "Dueño"];
const roleStyle: Record<Role, string> = {
  Cliente: "bg-blue-100 text-blue-800",
  Abogado: "bg-emerald-100 text-emerald-800",
  Gerente: "bg-amber-100 text-amber-800",
  Dueño: "bg-slate-200 text-slate-800",
};

const seed: AppUser[] = [
  { id: 1, name: "Juan Pérez Gómez", document: "1023456789", email: "juan.perez@email.com", phone: "300 123 4567", role: "Cliente", office: "Bogotá", active: true },
  { id: 2, name: "Ana García", document: "52118840", email: "ana.garcia@aurea.co", phone: "310 555 0148", role: "Abogado", office: "Bogotá", active: true },
  { id: 3, name: "Carlos Ruiz", document: "79440121", email: "carlos.ruiz@aurea.co", phone: "311 220 9087", role: "Abogado", office: "Medellín", active: true },
  { id: 4, name: "Natalia Méndez", document: "1032884410", email: "natalia.mendez@aurea.co", phone: "315 804 2231", role: "Gerente", office: "Bogotá", active: true },
  { id: 5, name: "Julián Restrepo", document: "98765432", email: "julian.restrepo@aurea.co", phone: "320 118 7745", role: "Gerente", office: "Medellín", active: true },
  { id: 6, name: "Roberto Sánchez", document: "16745099", email: "roberto.sanchez@aurea.co", phone: "301 672 3390", role: "Abogado", office: "Cali", active: false },
  { id: 7, name: "Isabel Aurea Londoño", document: "41550123", email: "isabel@aurea.co", phone: "300 000 1122", role: "Dueño", office: "Bogotá", active: true },
];

const empty: Omit<AppUser, "id"> = { name: "", document: "", email: "", phone: "", role: "Cliente", office: "Bogotá", active: true };

export function ManageUsers() {
  const [users, setUsers] = useState<AppUser[]>(seed);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [editing, setEditing] = useState<AppUser | null>(null);
  const [form, setForm] = useState<Omit<AppUser, "id">>(empty);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<AppUser | null>(null);

  const filtered = useMemo(() => users.filter((u) =>
    `${u.name} ${u.document} ${u.email}`.toLowerCase().includes(search.toLowerCase()) &&
    (roleFilter === "Todos" || u.role === roleFilter)
  ), [users, search, roleFilter]);

  const openCreate = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (u: AppUser) => { setEditing(u); setForm({ name: u.name, document: u.document, email: u.email, phone: u.phone, role: u.role, office: u.office, active: u.active }); setOpen(true); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setUsers((list) => list.map((u) => (u.id === editing.id ? { ...u, ...form } : u)));
      toast.success("Usuario actualizado");
    } else {
      setUsers((list) => [{ id: Date.now(), ...form }, ...list]);
      toast.success("Usuario creado");
    }
    setOpen(false);
  };

  const remove = () => {
    if (!toDelete) return;
    setUsers((list) => list.filter((u) => u.id !== toDelete.id));
    toast.success(`Usuario ${toDelete.name} eliminado`);
    setToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Administración</p>
          <h1 className="mt-2 text-3xl font-extrabold text-primary">Administrar usuarios</h1>
          <p className="mt-2 text-sm text-muted-foreground">Crea, edita y elimina clientes, abogados, gerentes y dueños.</p>
        </div>
        <button onClick={openCreate} className="flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"><Plus className="h-4 w-4" />Nuevo usuario</button>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-white">
        <div className="flex flex-wrap gap-3 border-b border-border p-4">
          <div className="relative min-w-64 flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre, documento o correo" className="w-full rounded-md bg-muted/60 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent" /></div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-md border border-border bg-white px-3 py-2 text-sm"><option>Todos</option>{roles.map((r) => <option key={r}>{r}</option>)}</select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-muted/50 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><tr>{["Usuario", "Rol", "Oficina", "Teléfono", "Estado", ""].map((h) => <th key={h} className="px-5 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-5 py-4 font-bold text-primary">{u.name}<span className="block font-mono text-[11px] font-normal text-muted-foreground">{u.document} · {u.email}</span></td>
                  <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${roleStyle[u.role]}`}>{u.role}</span></td>
                  <td className="px-5 py-4">{u.office}</td>
                  <td className="px-5 py-4">{u.phone}</td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center gap-2 text-xs font-bold ${u.active ? "text-emerald-700" : "text-muted-foreground"}`}><span className={`h-2 w-2 rounded-full ${u.active ? "bg-accent" : "bg-slate-400"}`} />{u.active ? "Activo" : "Inactivo"}</span></td>
                  <td className="px-5 py-4"><div className="flex justify-end gap-1"><button title="Editar" onClick={() => openEdit(u)} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-primary"><Pencil className="h-4 w-4" /></button><button title="Eliminar" onClick={() => setToDelete(u)} className="rounded-md p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">No hay usuarios que coincidan.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-primary/70 p-4 py-8 backdrop-blur-sm">
          <form onSubmit={save} className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-border p-6">
              <div><p className="font-mono text-xs uppercase tracking-wider text-accent">{editing ? "Edición" : "Alta"}</p><h2 className="mt-1 text-xl font-extrabold text-primary">{editing ? "Actualizar usuario" : "Crear usuario"}</h2></div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid gap-5 p-6 md:grid-cols-2">
              <label className="block md:col-span-2"><span className="mb-2 block text-sm font-bold">Nombre completo</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Número de documento</span><input required value={form.document} onChange={(e) => setForm({ ...form, document: e.target.value })} className="form-input" /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Teléfono</span><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-input" /></label>
              <label className="block md:col-span-2"><span className="mb-2 block text-sm font-bold">Correo electrónico</span><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" /></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Rol</span><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })} className="form-input">{roles.map((r) => <option key={r}>{r}</option>)}</select></label>
              <label className="block"><span className="mb-2 block text-sm font-bold">Oficina</span><select value={form.office} onChange={(e) => setForm({ ...form, office: e.target.value })} className="form-input">{offices.map((o) => <option key={o}>{o}</option>)}</select></label>
              <label className="flex items-center gap-3 md:col-span-2"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="h-4 w-4 accent-[#07966f]" /><span className="text-sm font-bold">Usuario activo</span></label>
            </div>
            <div className="flex justify-end gap-3 border-t border-border p-5"><button type="button" onClick={() => setOpen(false)} className="rounded-md border border-border px-4 py-2 text-sm font-bold">Cancelar</button><button className="rounded-md bg-accent px-5 py-2 text-sm font-bold text-white">{editing ? "Guardar cambios" : "Crear usuario"}</button></div>
          </form>
        </div>
      )}

      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-extrabold text-primary">¿Eliminar usuario?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Se eliminará a <span className="font-bold text-foreground">{toDelete.name}</span> ({toDelete.role}). Esta acción no se puede deshacer.</p>
            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setToDelete(null)} className="rounded-md border border-border px-4 py-2 text-sm font-bold">Cancelar</button><button onClick={remove} className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">Eliminar</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
