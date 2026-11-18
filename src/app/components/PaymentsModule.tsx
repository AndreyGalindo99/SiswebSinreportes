import { toast } from "sonner";
import { CreditCard, Download, Calendar, AlertCircle, CheckCircle, Clock, DollarSign, Building2, Landmark, Smartphone, X } from "lucide-react";
import { useState } from "react";

export function PaymentsModule() {
  const [showChannels, setShowChannels] = useState(false);
  const [officeType, setOfficeType] = useState<"fisica" | "digital">("fisica");
  const paymentHistory = [
    {
      id: 1,
      date: '15 May 2026',
      amount: '$2,500',
      concept: 'Cuota Mensual - Mayo',
      status: 'Pagado',
      method: 'Tarjeta **** 4242',
    },
    {
      id: 2,
      date: '15 Abr 2026',
      amount: '$2,500',
      concept: 'Cuota Mensual - Abril',
      status: 'Pagado',
      method: 'Tarjeta **** 4242',
    },
    {
      id: 3,
      date: '15 Mar 2026',
      amount: '$2,500',
      concept: 'Cuota Mensual - Marzo',
      status: 'Pagado',
      method: 'Tarjeta **** 4242',
    },
    {
      id: 4,
      date: '15 Feb 2026',
      amount: '$2,500',
      concept: 'Cuota Mensual - Febrero',
      status: 'Pagado',
      method: 'Transferencia',
    },
    {
      id: 5,
      date: '15 Ene 2026',
      amount: '$5,000',
      concept: 'Pago Inicial del Servicio',
      status: 'Pagado',
      method: 'Tarjeta **** 4242',
    },
  ];

  const installments = [
    { month: 'Enero 2026', amount: '$5,000', status: 'Pagado', dueDate: '15 Ene 2026' },
    { month: 'Febrero 2026', amount: '$2,500', status: 'Pagado', dueDate: '15 Feb 2026' },
    { month: 'Marzo 2026', amount: '$2,500', status: 'Pagado', dueDate: '15 Mar 2026' },
    { month: 'Abril 2026', amount: '$2,500', status: 'Pagado', dueDate: '15 Abr 2026' },
    { month: 'Mayo 2026', amount: '$2,500', status: 'Pagado', dueDate: '15 May 2026' },
    { month: 'Junio 2026', amount: '$2,500', status: 'Pendiente', dueDate: '15 Jun 2026' },
    { month: 'Julio 2026', amount: '$2,500', status: 'Pendiente', dueDate: '15 Jul 2026' },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'Pagado') return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === 'Pendiente') return <Clock className="w-4 h-4 text-yellow-600" />;
    return <AlertCircle className="w-4 h-4 text-red-600" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Pagado') return 'bg-green-100 text-green-700';
    if (status === 'Pendiente') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl text-slate-900 mb-2">Gestión de Pagos</h1>
        <p className="text-slate-600">Administra tus pagos y consulta el historial</p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-yellow-900 mb-1">Pago Próximo a Vencer</h3>
          <p className="text-sm text-yellow-700">
            Tu próximo pago de <span className="font-medium">$2,500</span> vence el{' '}
            <span className="font-medium">15 de Junio, 2026</span>. Realiza tu pago antes de la fecha límite.
          </p>
          <button onClick={() => setShowChannels(true)} className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition">
            Realizar Pago Ahora
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Pagado</p>
              <p className="text-2xl text-slate-900">$15,000</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Cuotas Pagadas</p>
              <p className="text-2xl text-slate-900">5 / 7</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Próximo Pago</p>
              <p className="text-2xl text-slate-900">15 Jun</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl text-slate-900">Estado de Cuotas</h2>
            <button onClick={() => setShowChannels(true)} className="bg-accent hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Realizar Pago
            </button>
          </div>

          <div className="divide-y divide-slate-200">
            {installments.map((installment, index) => (
              <div key={index} className="p-6 hover:bg-slate-50 transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(installment.status)}
                    <h3 className="text-slate-900">{installment.month}</h3>
                  </div>
                  <span className="text-lg text-slate-900">{installment.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">Vencimiento: {installment.dueDate}</p>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(installment.status)}`}>
                    {installment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl text-slate-900">Historial de Pagos</h2>
          </div>

          <div className="divide-y divide-slate-200">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="p-6 hover:bg-slate-50 transition">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-slate-900 mb-1">{payment.concept}</h3>
                    <p className="text-sm text-slate-600 mb-2">{payment.method}</p>
                    <p className="text-xs text-slate-500">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-slate-900 mb-2">{payment.amount}</p>
                    <button onClick={() => toast.success(`Recibo de ${payment.concept} descargado`)} className="text-sm text-accent hover:underline flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      Recibo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showChannels && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-border p-6">
              <div><p className="font-mono text-xs uppercase tracking-wider text-accent">Canales vigentes</p><h2 className="mt-1 text-2xl font-extrabold text-primary">Realizar pago</h2><p className="mt-1 text-sm text-muted-foreground">Verifica el tipo de oficina antes de transferir.</p></div>
              <button onClick={() => setShowChannels(false)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 rounded-md bg-muted p-1">
                <button onClick={() => setOfficeType("fisica")} className={`flex items-center justify-center gap-2 rounded px-4 py-2.5 text-sm font-bold ${officeType === "fisica" ? "bg-white text-primary shadow-sm" : "text-muted-foreground"}`}><Building2 className="h-4 w-4" />Oficina física</button>
                <button onClick={() => setOfficeType("digital")} className={`flex items-center justify-center gap-2 rounded px-4 py-2.5 text-sm font-bold ${officeType === "digital" ? "bg-white text-primary shadow-sm" : "text-muted-foreground"}`}><Smartphone className="h-4 w-4" />Oficina digital</button>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(officeType === "fisica" ? [
                  { name: "Bancolombia · Ahorros", number: "245-908172-44", owner: "Área Gestión Legal S.A.S.", icon: Landmark },
                  { name: "Daviplata", number: "310 845 2210", owner: "NIT 901.284.520-1", icon: Smartphone },
                ] : [
                  { name: "Nequi", number: "315 720 8841", owner: "Recaudo oficina digital", icon: Smartphone },
                  { name: "Davivienda · Ahorros", number: "0048-0012-8840", owner: "Área Digital S.A.S.", icon: Landmark },
                ]).map((channel) => {
                  const Icon = channel.icon;
                  return <div key={channel.name} className="rounded-md border border-border p-5"><Icon className="h-6 w-6 text-accent" /><h3 className="mt-4 font-bold text-primary">{channel.name}</h3><p className="mt-2 font-mono text-lg font-bold">{channel.number}</p><p className="mt-1 text-xs text-muted-foreground">{channel.owner}</p></div>;
                })}
              </div>
              <div className="mt-5 flex gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><AlertCircle className="h-5 w-5 shrink-0" /><p>Los canales pueden cambiar según la sede. Confirma que el titular y el número coincidan antes de pagar. Envía el comprobante desde Evidencias.</p></div>
            </div>
            <div className="flex justify-end border-t border-border p-5"><button onClick={() => setShowChannels(false)} className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white">Entendido</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
