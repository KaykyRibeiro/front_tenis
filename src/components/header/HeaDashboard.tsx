import { LayoutDashboard, DownloadCloud } from "lucide-react";

export default function HeaDashboard() {
  return (
    <div className="w-full flex md:flex-row flex-col justify-between px-6 lg:px-10 py-4 gap-4 md:items-center bg-white/60 dark:bg-black-smooth backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50">
      <div className="flex flex-row items-center gap-4">
        <div className="p-2 bg-primary-color/10 rounded-lg">
          <LayoutDashboard className="w-6 h-6 text-primary-color" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            Visão Geral
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Acompanhe o desempenho do seu complexo esportivo
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-all shadow-sm font-medium text-sm">
          <DownloadCloud strokeWidth={2.5} className="w-4 h-4" />
          Exportar Relatório
        </button>
      </div>
    </div>
  );
}
