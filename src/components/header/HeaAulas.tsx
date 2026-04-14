import { Plus, Calendar as CalendarIcon } from "lucide-react";

export default function HeaAulas() {
  return (
    <div className="w-full flex md:flex-row flex-col justify-between px-6 lg:px-10 py-4 gap-4 md:items-center bg-white/60 dark:bg-black-smooth backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50">
      <div className="flex flex-row items-center gap-4">
        <div className="p-2 bg-primary-color/10 rounded-lg">
          <CalendarIcon className="w-6 h-6 text-primary-color" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            Gestão de Aulas
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Acompanhe o cronograma e agende novas aulas
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <button className="flex items-center gap-2 bg-primary-color text-white px-5 py-2.5 rounded-xl hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-primary-color/20 font-medium text-sm">
          <Plus strokeWidth={2.5} className="w-5 h-5" />
          Agendar Aula
        </button>
      </div>
    </div>
  );
}
