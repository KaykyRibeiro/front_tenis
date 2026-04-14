import clsx from "clsx";
import { X, Clock, MapPin, BarChart, Calendar as CalendarIcon } from "lucide-react";
import type { AulaProps } from "../../pages/aulas/Aulas";

interface ModalAulaProps {
  aula: AulaProps | null;
  onClose: () => void;
}

export default function ModalAula({ aula, onClose }: ModalAulaProps) {
  if (!aula) return null;

  const getStatusColor = (status: AulaProps["status"]) => {
    switch (status) {
      case "Em andamento":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Concluída":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Agendada":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Cancelada":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={clsx("w-3 h-3 rounded-full", getStatusColor(aula.status).split(" ")[0])} />
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Detalhes da Aula
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
              {aula.quadra}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">{aula.data}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">{aula.horario}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">{aula.quadra}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <BarChart className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Nível: {aula.nivel}</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-gray-100 dark:border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={aula.professor.foto} alt={aula.professor.nome} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-semibold uppercase">Professor</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{aula.professor.nome}</span>
              </div>
            </div>
            <hr className="border-gray-200 dark:border-zinc-700" />
            <div className="flex items-center gap-3">
              <img src={aula.aluno.foto} alt={aula.aluno.nome} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-semibold uppercase">Aluno(a)</span>
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{aula.aluno.nome}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex justify-end gap-3 mt-2">
          {aula.status === "Agendada" && (
             <button className="px-5 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20 font-medium transition-colors text-sm">
                Cancelar Aula
             </button>
          )}
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-colors text-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
