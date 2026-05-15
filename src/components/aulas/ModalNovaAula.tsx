import { X } from "lucide-react";

interface ModalNovaAulaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalNovaAula({ isOpen, onClose }: ModalNovaAulaProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Agendar Nova Aula
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Preencha os dados para agendar uma aula
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content (Formulário) */}
        <div className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Data</label>
              <input 
                type="date" 
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Horário</label>
              <input 
                type="time" 
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quadra</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all text-sm appearance-none cursor-pointer">
              <option value="">Selecione uma quadra</option>
              <option value="saibro1">Saibro 1</option>
              <option value="saibro2">Saibro 2</option>
              <option value="rapida1">Rápida 1</option>
              <option value="coberta1">Coberta 1</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Professor(a)</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all text-sm appearance-none cursor-pointer">
              <option value="">Selecione o professor</option>
              <option value="carlos">Carlos</option>
              <option value="marcos">Marcos</option>
              <option value="felipe">Felipe</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Aluno(a)</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all text-sm appearance-none cursor-pointer">
              <option value="">Selecione o aluno</option>
              <option value="ana">Ana</option>
              <option value="roberto">Roberto</option>
              <option value="juliana">Juliana</option>
              <option value="pedro">Pedro</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nível</label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all text-sm appearance-none cursor-pointer">
              <option value="">Selecione o nível</option>
              <option value="iniciante">Iniciante</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex justify-end gap-3 mt-2">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 font-medium rounded-xl transition-colors text-sm"
          >
            Cancelar
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-primary-color hover:bg-green-600 text-white font-medium rounded-xl transition-colors text-sm shadow-lg shadow-primary-color/20"
          >
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
}
