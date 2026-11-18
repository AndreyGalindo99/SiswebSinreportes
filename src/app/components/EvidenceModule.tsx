import { toast } from "sonner";
import { Upload, FileText, Image, File, Download, MessageSquare, CheckCircle, Search, X } from "lucide-react";
import { useState } from 'react';

export function EvidenceModule({ role = "cliente" }: { role?: string }) {
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [clientQuery, setClientQuery] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);

  const evidences = [
    {
      id: 1,
      name: 'Reporte de Crédito Original.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Juan Pérez (Cliente)',
      date: '15 Ene 2026',
      status: 'Aprobado',
      comments: 2,
    },
    {
      id: 2,
      name: 'Carta de Disputa.pdf',
      type: 'PDF',
      size: '1.1 MB',
      uploadedBy: 'Ana García (Abogado)',
      date: '18 Ene 2026',
      status: 'Aprobado',
      comments: 5,
    },
    {
      id: 3,
      name: 'Comprobante de Pago.jpg',
      type: 'Imagen',
      size: '856 KB',
      uploadedBy: 'Juan Pérez (Cliente)',
      date: '20 Ene 2026',
      status: 'En Revisión',
      comments: 1,
    },
    {
      id: 4,
      name: 'Acuerdo Legal.pdf',
      type: 'PDF',
      size: '3.2 MB',
      uploadedBy: 'Ana García (Abogado)',
      date: '25 Ene 2026',
      status: 'Aprobado',
      comments: 3,
    },
  ];

  const getFileIcon = (type: string) => {
    if (type === 'PDF') return FileText;
    if (type === 'Imagen') return Image;
    return File;
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl text-slate-900 mb-2">Gestión de Evidencias</h1>
        <p className="text-slate-600">Administra todos los documentos relacionados con tu caso</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-lg px-4 py-2 border border-slate-200 flex items-center gap-2">
            <span className="text-sm text-slate-600">Estado del Caso:</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Fase 3 - En Proceso
            </span>
          </div>
        </div>

        <button onClick={() => { setShowUpload(true); setUploadComplete(false); }} className="bg-accent hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-green-500/20 transition">
          <Upload className="w-5 h-5" />
          Subir Evidencia
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl text-slate-900">Documentos Cargados</h2>
          </div>

          <div className="divide-y divide-slate-200">
            {evidences.map((evidence) => {
              const FileIcon = getFileIcon(evidence.type);
              const isSelected = selectedFile === evidence.id;

              return (
                <div
                  key={evidence.id}
                  onClick={() => setSelectedFile(evidence.id)}
                  className={`p-6 cursor-pointer transition ${
                    isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${evidence.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <FileIcon className={`w-6 h-6 ${evidence.type === 'PDF' ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-slate-900 truncate">{evidence.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs flex-shrink-0 ml-2 ${
                            evidence.status === 'Aprobado'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {evidence.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                        <span>{evidence.size}</span>
                        <span>•</span>
                        <span>{evidence.uploadedBy}</span>
                        <span>•</span>
                        <span>{evidence.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button onClick={(e) => { e.stopPropagation(); toast.success(`Descargando ${evidence.name}`); }} className="text-sm text-accent hover:underline flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          Descargar
                        </button>
                        <button onClick={() => setSelectedFile(evidence.id)} className="text-sm text-slate-600 hover:underline flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {evidence.comments} Comentarios
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl text-slate-900 mb-6">Vista Previa</h2>

          {selectedFile ? (
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 text-sm">Vista previa del documento</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-slate-900">Comentarios</h3>

                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                        AG
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 mb-1">Ana García</p>
                        <p className="text-sm text-slate-600">Documento verificado y aprobado para continuar con la Fase 3.</p>
                        <p className="text-xs text-slate-500 mt-1">Hace 2 días</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                        JP
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900 mb-1">Juan Pérez</p>
                        <p className="text-sm text-slate-600">Gracias por la actualización.</p>
                        <p className="text-xs text-slate-500 mt-1">Hace 1 día</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Agregar un comentario..."
                    className="flex-1 px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                  <button onClick={() => toast.success("Comentario enviado")} className="bg-accent hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <File className="w-12 h-12 mx-auto mb-3" />
              <p className="text-sm">Selecciona un documento para ver los detalles</p>
            </div>
          )}
        </div>
      </div>

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4 backdrop-blur-sm">
          <form onSubmit={(e) => { e.preventDefault(); setUploadComplete(true); }} className="w-full max-w-xl rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-border p-6">
              <div><p className="font-mono text-xs uppercase tracking-wider text-accent">Nuevo documento</p><h2 className="mt-1 text-xl font-extrabold text-primary">Subir evidencia</h2><p className="mt-1 text-sm text-muted-foreground">Asocia la respuesta al expediente correcto.</p></div>
              <button type="button" onClick={() => setShowUpload(false)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            {uploadComplete ? (
              <div className="p-8 text-center"><CheckCircle className="mx-auto h-12 w-12 text-accent" /><h3 className="mt-4 text-lg font-bold text-primary">Evidencia cargada</h3><p className="mt-1 text-sm text-muted-foreground">El documento quedó asociado y disponible en el historial.</p><button type="button" onClick={() => setShowUpload(false)} className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white">Finalizar</button></div>
            ) : (
              <>
                <div className="space-y-5 p-6">
                  {role === "abogado" && <label className="block"><span className="mb-2 block text-sm font-bold">Cliente destinatario</span><div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input required value={clientQuery} onChange={(e) => setClientQuery(e.target.value)} placeholder="Número de cédula o nombre del cliente" className="form-input pl-9" /></div>{clientQuery && <button type="button" className="mt-2 w-full rounded-md border border-accent bg-emerald-50 p-3 text-left text-sm"><span className="font-bold text-primary">Juan Pérez Gómez</span><span className="ml-2 font-mono text-xs text-muted-foreground">CC 1.023.456.789</span></button>}</label>}
                  <label className="block"><span className="mb-2 block text-sm font-bold">Tipo de respuesta</span><select className="form-input"><option>Respuesta de entidad</option><option>Reclamación radicada</option><option>Soporte de pago</option><option>Documento legal</option><option>Otra evidencia</option></select></label>
                  <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/30 text-center transition hover:border-accent">
                    <Upload className="h-6 w-6 text-accent" /><span className="mt-2 text-sm font-bold text-primary">Selecciona o arrastra un archivo</span><span className="mt-1 text-xs text-muted-foreground">PDF, JPG o PNG · Máximo 15 MB</span><input required type="file" className="hidden" />
                  </label>
                  <label className="block"><span className="mb-2 block text-sm font-bold">Descripción</span><textarea rows={3} className="form-input resize-none" placeholder="Indica qué contiene la evidencia..." /></label>
                </div>
                <div className="flex justify-end gap-3 border-t border-border p-5"><button type="button" onClick={() => setShowUpload(false)} className="rounded-md border border-border px-4 py-2 text-sm font-bold">Cancelar</button><button className="rounded-md bg-accent px-5 py-2 text-sm font-bold text-white">Cargar evidencia</button></div>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
