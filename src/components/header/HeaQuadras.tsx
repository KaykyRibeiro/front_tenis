import { Plus } from "lucide-react";

export default function HeaQuadras() {
  return (
    <div className="w-full flex md:flex-row flex-col justify-between px-6 lg:px-10 py-4 gap-4 md:items-center bg-white/60 dark:bg-black-smooth backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          Gestão de Quadras
        </h1>
        <span className="text-xs font-semibold text-primary-color bg-primary-color/10 px-3 py-1 rounded-full uppercase tracking-wider">
          3 quadras
        </span>
      </div>
      <div className="flex flex-row items-center gap-3">
        
        <button 
             
            className="flex items-center gap-2 bg-primary-color/20 text-white/40 px-4 py-2.5 rounded-xl transition-colors duration-300 font-medium text-sm">
          <Plus strokeWidth={2.5} className="w-5 h-5" />
          Adicionar Quadra
        </button>
      </div>
    </div>
  );
}