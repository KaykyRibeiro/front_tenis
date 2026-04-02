import { SquarePen } from "lucide-react";

type PerfilProps = {
  nome: string;
  fotoUrl: string;
  status?: string;
  aulas: string[];
  disponibilidade: string[];
};

const getStatusStyle = (status?: string) => {
  switch (status) {
    case "ATIVO":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500";
    case "INATIVO":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-500";
    case "BLOQUEADO":
      return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
};

export default function CardPerfil({ nome, fotoUrl, status, aulas, disponibilidade }: PerfilProps) {
  return (
    <div className="flex flex-col items-center w-full bg-white dark:bg-zinc-900/60 backdrop-blur-md shadow-xl shadow-black/5 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden group transition-all duration-300">
      {/* Cobre decorativa no topo */}
      <div className="h-28 w-full bg-linear-to-r from-primary-color/30 to-primary-color/5 dark:from-primary-color/20 dark:to-transparent relative">
         <div className="absolute top-4 right-4 flex gap-2">
            <button className="flex text-gray-700 dark:text-gray-200 items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-xl hover:bg-white dark:hover:bg-black/60 transition-colors duration-300 shadow-sm text-sm font-semibold">
              <SquarePen size={16} />
              Editar
            </button>
         </div>
      </div>
      
      <div className="flex flex-col items-center px-6 pb-8 w-full -mt-14 relative z-10">
        <div className="relative">
          <img src={fotoUrl} alt={nome} className="w-28 h-28 rounded-full object-cover ring-4 ring-white dark:ring-zinc-900 bg-white dark:bg-zinc-800 shadow-md" />
          {status && (
            <span className={`absolute bottom-1 right-0 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ring-2 ring-white dark:ring-zinc-900 shadow-sm ${getStatusStyle(status)}`}>
              {status}
            </span>
          )}
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-4 tracking-tight text-center">{nome}</h2>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">Professor(a)</p>

        <div className="w-full mt-8 h-px bg-gray-100 dark:bg-zinc-800/80" />
        
        <div className="w-full mt-6 flex flex-col">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mb-3">Aulas Atuais</h3>
          <ul className="flex flex-wrap gap-2">
            {aulas && aulas.length > 0 ? (
              aulas.map((aula, index) => (
                 <li className="bg-primary-color/5 dark:bg-primary-color/10 border border-primary-color/20 text-primary-color dark:text-green-400 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-primary-color/10 dark:hover:bg-primary-color/20" key={index}>{aula}</li>
              ))
            ) : (
                <li className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">Sem aulas no momento.</li>
            )}
          </ul>
        </div>
        
        <div className="w-full mt-6 flex flex-col">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mb-3">Disponibilidade</h3>
          <ul className="flex flex-wrap gap-2">
            {disponibilidade && disponibilidade.length > 0 ? (
              disponibilidade.map((item, index) => (
                 <li className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-blue-100 dark:hover:bg-blue-500/20" key={index}>{item}</li>
              ))
            ) : (
                 <li className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">Horários não informados.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}