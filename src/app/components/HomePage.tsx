import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Building2, CheckCircle2, MapPin, Phone, Play, Quote, Users, X } from "lucide-react";

const offices = [
  { city: "Bogotá D.C.", address: "Calle 93B # 18–12, Oficina 402", phone: "(601) 745 8020", type: "Sede principal" },
  { city: "Medellín", address: "Carrera 43A # 1–50, El Poblado", phone: "(604) 604 1825", type: "Oficina física" },
  { city: "Cali", address: "Avenida 6N # 24N–17, Oficina 301", phone: "(602) 489 1130", type: "Oficina física" },
  { city: "Barranquilla", address: "Carrera 53 # 80–67, Alto Prado", phone: "(605) 385 9040", type: "Oficina física" },
  { city: "Bucaramanga", address: "Carrera 33 # 48–20, Cabecera", phone: "(607) 697 2214", type: "Atención híbrida" },
  { city: "Oficina Digital", address: "Cobertura en todo Colombia", phone: "01 8000 412 800", type: "Atención nacional" },
];

const videos = [
  { title: "“Volví a tener acceso al sistema financiero”", person: "Camila R. · Proceso finalizado", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=560&fit=crop&auto=format" },
  { title: "Un proceso claro, acompañado y transparente", person: "Andrés M. · Cliente Medellín", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=560&fit=crop&auto=format" },
];

export function HomePage() {
  const [video, setVideo] = useState<{ title: string; subtitle: string; image?: string } | null>(null);
  const [showRequest, setShowRequest] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-primary px-6 py-12 text-white md:px-10 md:py-16">
        <div className="absolute inset-y-0 right-0 w-2/5 bg-accent/10 [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative max-w-6xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">Red nacional de atención</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] md:text-6xl">
            Recuperar tu tranquilidad financiera empieza con información clara.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
            Consulta nuestras sedes, agenda una valoración y conoce experiencias reales de personas que finalizaron su proceso.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setShowRequest(true)} className="flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600">
              Solicitar consulta <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#oficinas" className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
              Ver oficinas
            </a>
          </div>
        </div>
      </section>

      <main className="space-y-14 px-6 py-10 md:px-10">
        <section id="oficinas">
          <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Presencia nacional</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">Encuentra tu oficina</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">Atención de lunes a viernes, 8:00 a.m. a 6:00 p.m. Las consultas requieren cita previa.</p>
          </div>
          <div className="grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-2 xl:grid-cols-3">
            {offices.map((office) => (
              <article key={office.city} className="border-b border-r border-border p-6 transition hover:bg-emerald-50/50">
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white"><Building2 className="h-5 w-5" /></div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{office.type}</span>
                </div>
                <h3 className="text-lg font-bold text-primary">{office.city}</h3>
                <p className="mt-3 flex gap-2 text-sm leading-6 text-muted-foreground"><MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />{office.address}</p>
                <p className="mt-2 flex gap-2 text-sm font-semibold text-foreground"><Phone className="h-4 w-4 text-accent" />{office.phone}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Historias verificadas</p>
            <h2 className="mt-2 text-3xl font-bold text-primary">Procesos que llegaron a buen término</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {videos.map((video) => (
                <button key={video.title} onClick={() => setVideo({ title: video.title, subtitle: video.person, image: video.image })} className="group relative min-h-64 overflow-hidden rounded-lg bg-slate-300 text-left">
                  <img src={video.image} alt={video.person} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
                    <h3 className="font-bold leading-6">{video.title}</h3>
                    <p className="mt-1 text-xs text-slate-300">{video.person}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <aside className="rounded-lg bg-primary p-7 text-white">
            <Quote className="h-8 w-8 text-accent" />
            <h2 className="mt-6 text-2xl font-bold">Consulta inicial</h2>
            <div className="mt-6 border-y border-white/10 py-5">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400">Valor desde</p>
              <p className="mt-1 text-4xl font-extrabold">$75.000 <span className="text-sm font-normal text-slate-400">COP</span></p>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-300">Incluye revisión preliminar del reporte, diagnóstico y ruta recomendada.</p>
            <h3 className="mt-6 text-sm font-bold">Requisitos para solicitarla</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-300">
              {["Documento de identidad", "Reporte de centrales de riesgo", "Soportes de pago o paz y salvos"].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />{item}</li>)}
            </ul>
          </aside>
        </section>

        <section className="border-t border-border pt-10">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Información importante</p>
              <h2 className="mt-2 text-3xl font-bold text-primary">Orientación de nuestros gerentes</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Consejos sobre protección de datos, hábitos de pago y prevención de fraudes.</p>
              <div className="mt-6 flex gap-3">
                {["Instagram", "Facebook", "YouTube"].map((network) => <button key={network} onClick={() => toast.info(`Abriendo ${network}…`)} className="rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold hover:border-accent">{network}</button>)}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <button onClick={() => setVideo({ title: "¿Cómo leer tu reporte?", subtitle: "Video informativo · 06:24 min" })} className="flex min-h-44 flex-col justify-between rounded-lg bg-emerald-50 p-6 text-left transition hover:shadow-md"><Users className="h-6 w-6 text-accent" /><div><h3 className="font-bold">¿Cómo leer tu reporte?</h3><p className="mt-1 text-sm text-muted-foreground">Video informativo · 06:24 min</p></div></button>
              <button onClick={() => setVideo({ title: "Evita falsas promesas financieras", subtitle: "Gerencia nacional · 04:12 min" })} className="flex min-h-44 flex-col justify-between rounded-lg border border-border bg-white p-6 text-left transition hover:shadow-md"><Play className="h-6 w-6 text-primary" /><div><h3 className="font-bold">Evita falsas promesas financieras</h3><p className="mt-1 text-sm text-muted-foreground">Gerencia nacional · 04:12 min</p></div></button>
            </div>
          </div>
        </section>
      </main>

      {video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 p-4 backdrop-blur-sm" onClick={() => setVideo(null)}>
          <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex aspect-video items-center justify-center bg-primary">
              {video.image && <img src={video.image} alt={video.subtitle} className="absolute inset-0 h-full w-full object-cover opacity-50" />}
              <button onClick={() => toast.info("Reproduciendo video…")} className="relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white transition hover:scale-105"><Play className="ml-1 h-7 w-7 fill-current" /></button>
              <button onClick={() => setVideo(null)} className="absolute right-3 top-3 rounded-md bg-white/10 p-2 text-white hover:bg-white/20"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5"><h3 className="text-lg font-bold text-primary">{video.title}</h3><p className="mt-1 text-sm text-muted-foreground">{video.subtitle}</p></div>
          </div>
        </div>
      )}

      {showRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); setShowRequest(false); toast.success("Solicitud enviada. Un asesor te contactará pronto."); }} className="w-full max-w-md rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-border p-6">
              <div><p className="font-mono text-xs uppercase tracking-wider text-accent">Consulta inicial</p><h2 className="mt-1 text-xl font-extrabold text-primary">Solicitar consulta</h2></div>
              <button type="button" onClick={() => setShowRequest(false)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4 p-6">
              <input required placeholder="Nombre completo" className="form-input" />
              <input required placeholder="Teléfono de contacto" className="form-input" />
              <select className="form-input"><option>Bogotá</option><option>Medellín</option><option>Cali</option><option>Barranquilla</option><option>Oficina digital</option></select>
            </div>
            <div className="flex justify-end gap-3 border-t border-border p-5"><button type="button" onClick={() => setShowRequest(false)} className="rounded-md border border-border px-4 py-2 text-sm font-bold">Cancelar</button><button className="rounded-md bg-accent px-5 py-2 text-sm font-bold text-white">Enviar solicitud</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
