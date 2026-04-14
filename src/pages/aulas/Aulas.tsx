import { useState } from "react";
import Sidebar from "../../components/navigation/Sidebar";
import HeaAulas from "../../components/header/HeaAulas";
import ModalAula from "../../components/aulas/ModalAula";
import clsx from "clsx";

export interface AulaProps {
  id: string;
  data: string; // Used loosely in mock
  horario: string; // e.g. "08:00"
  diaSemana?: number; // 0 (Dom) to 6 (Sab)
  diaMes?: number; // 1 to 31
  quadra: string;
  professor: { nome: string; foto: string };
  aluno: { nome: string; foto: string };
  nivel: "Iniciante" | "Intermediário" | "Avançado";
  status: "Agendada" | "Em andamento" | "Concluída" | "Cancelada";
}

const mockAulas: AulaProps[] = [
  {
    id: "1",
    data: "14/04",
    horario: "08:00",
    diaSemana: 2, // Terça
    diaMes: 14,
    quadra: "Saibro 1",
    professor: { nome: "Carlos", foto: "https://ui-avatars.com/api/?name=Carlos&background=22c55e&color=fff" },
    aluno: { nome: "Ana", foto: "https://ui-avatars.com/api/?name=Ana&background=3b82f6&color=fff" },
    nivel: "Iniciante",
    status: "Concluída",
  },
  {
    id: "2",
    data: "14/04",
    horario: "10:00",
    diaSemana: 2, // Terça
    diaMes: 14,
    quadra: "Rápida 1",
    professor: { nome: "Carlos", foto: "https://ui-avatars.com/api/?name=Carlos&background=22c55e&color=fff" },
    aluno: { nome: "Roberto", foto: "https://ui-avatars.com/api/?name=Roberto&background=F56565&color=fff" },
    nivel: "Avançado",
    status: "Em andamento",
  },
  {
    id: "3",
    data: "15/04",
    horario: "09:00",
    diaSemana: 3, // Quarta
    diaMes: 15,
    quadra: "Coberta 2",
    professor: { nome: "Marcos", foto: "https://ui-avatars.com/api/?name=Marcos&background=22c55e&color=fff" },
    aluno: { nome: "Juliana", foto: "https://ui-avatars.com/api/?name=Juliana&background=9F7AEA&color=fff" },
    nivel: "Intermediário",
    status: "Agendada",
  },
  {
    id: "4",
    data: "18/04",
    horario: "15:00",
    diaSemana: 6, // Sábado
    diaMes: 18,
    quadra: "Rápida 2",
    professor: { nome: "Felipe", foto: "https://ui-avatars.com/api/?name=Felipe&background=22c55e&color=fff" },
    aluno: { nome: "Pedro", foto: "https://ui-avatars.com/api/?name=Pedro&background=ED8936&color=fff" },
    nivel: "Iniciante",
    status: "Agendada",
  },
];

const horas = Array.from({ length: 14 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`);
const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function Aulas() {
  const [view, setView] = useState<"hoje" | "semana" | "mes">("semana");
  const [selectedAula, setSelectedAula] = useState<AulaProps | null>(null);

  const renderEventCard = (aula: AulaProps, compact = false) => {
    let colorClass = "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/40 dark:border-blue-800/50 dark:text-blue-300";
    if (aula.status === "Concluída") colorClass = "bg-green-100 border-green-200 text-green-800 dark:bg-green-900/40 dark:border-green-800/50 dark:text-green-300";
    if (aula.status === "Agendada") colorClass = "bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900/40 dark:border-yellow-800/50 dark:text-yellow-300";

    return (
      <div 
        onClick={() => setSelectedAula(aula)}
        className={clsx(
          "w-full h-full p-2 border-l-4 rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-opacity flex flex-col justify-start overflow-hidden",
          colorClass,
          compact ? "min-h-[40px]" : "min-h-[70px]"
        )}
      >
        <span className="text-[10px] font-bold uppercase tracking-wider">{aula.status}</span>
        {!compact && (
          <>
            <span className="text-xs font-semibold mt-1 truncate">{aula.aluno.nome}</span>
            <span className="text-[10px] opacity-80 truncate">{aula.horario} • {aula.quadra}</span>
          </>
        )}
        {compact && (
          <span className="text-[10px] truncate">{aula.horario} - {aula.aluno.nome}</span>
        )}
      </div>
    );
  };

  return (
    <div
      className={clsx(
        "min-h-screen bg-gray-smooth dark:bg-black-smooth font-sans text-gray-900 dark:text-gray-100 flex overflow-hidden"
      )}
    >
      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden transition-all duration-300">
        <header className="flex flex-col w-full">
          <HeaAulas />
        </header>

        <main className="flex-1 overflow-y-auto w-full p-6 flex flex-col">
          
          {/* Header Controls */}
          <div className="w-full max-w-[1400px] mx-auto mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {view === "hoje" ? "14 de Abril (Terça)" : view === "semana" ? "12 a 18 de Abril" : "Abril 2026"}
            </h2>
            
            <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg">
              {(["hoje", "semana", "mes"] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={clsx(
                    "px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors",
                    view === v 
                      ? "bg-white dark:bg-zinc-700 shadow-sm text-gray-900 dark:text-gray-100" 
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  {v === "hoje" ? "Hoje" : v === "semana" ? "Semana" : "Mês"}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Board */}
          <div className="flex-1 max-w-[1400px] mx-auto w-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col overflow-hidden">
            
            {/* --- HOJE VIEW --- */}
            {view === "hoje" && (
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-[80px_1fr] border-b border-gray-100 dark:border-zinc-800">
                  <div className="p-4 border-r border-gray-100 dark:border-zinc-800"></div>
                  <div className="p-4 font-semibold text-center text-primary-color">Terça, 14</div>
                </div>
                {horas.map(hora => (
                  <div key={hora} className="grid grid-cols-[80px_1fr] min-h-[100px] border-b border-gray-50 dark:border-zinc-800/50 group">
                    <div className="p-2 border-r border-gray-100 dark:border-zinc-800 text-xs text-gray-400 text-right">
                      {hora}
                    </div>
                    <div className="p-1 relative">
                      {mockAulas.filter(a => a.diaSemana === 2 && a.horario === hora).map(aula => (
                        <div key={aula.id} className="h-full">
                          {renderEventCard(aula)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- SEMANA VIEW --- */}
            {view === "semana" && (
              <div className="flex-1 overflow-y-auto flex flex-col">
                <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-200 dark:border-zinc-700 sticky top-0 bg-gray-50 dark:bg-zinc-800 z-10 shadow-sm">
                  <div className="border-r border-gray-200 dark:border-zinc-700"></div>
                  {diasSemana.map((dia, idx) => (
                    <div key={dia} className="p-3 text-center border-r border-gray-200 dark:border-zinc-700 last:border-0 flex flex-col items-center justify-center">
                      <span className="text-xs text-gray-500 uppercase">{dia}</span>
                      <span className={clsx("text-lg font-semibold mt-0.5 w-8 h-8 flex items-center justify-center rounded-full", idx === 2 ? "bg-primary-color text-white" : "text-gray-700 dark:text-gray-200")}>
                        {12 + idx}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex-1 relative">
                  {horas.map(hora => (
                    <div key={hora} className="grid grid-cols-[60px_repeat(7,1fr)] min-h-[80px] border-b border-gray-100 dark:border-zinc-800">
                      <div className="p-2 border-r border-gray-200 dark:border-zinc-700 text-[11px] text-gray-400 flex items-start justify-end pr-3">
                        {hora}
                      </div>
                      {Array.from({ length: 7 }).map((_, diaIdx) => {
                        const aulaNesteSlot = mockAulas.find(a => a.diaSemana === diaIdx && a.horario === hora);
                        return (
                          <div key={diaIdx} className="border-r border-gray-100 dark:border-zinc-800 last:border-0 p-1 hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                            {aulaNesteSlot && renderEventCard(aulaNesteSlot)}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- MÊS VIEW --- */}
            {view === "mes" && (
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-7 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800">
                  {diasSemana.map(dia => (
                     <div key={dia} className="p-2 text-center text-xs font-semibold text-gray-500 border-r border-gray-200 dark:border-zinc-800 last:border-0">{dia}</div>
                  ))}
                </div>
                <div className="flex-1 grid grid-cols-7 grid-rows-5">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const diaDoMes = i - 2 > 0 && i - 2 <= 30 ? i - 2 : null;
                    const isHoje = diaDoMes === 14;
                    const aulasNoDia = mockAulas.filter(a => a.diaMes === diaDoMes);

                    return (
                      <div key={i} className={clsx(
                        "border-b border-r border-gray-100 dark:border-zinc-800 p-1 min-h-[100px]",
                        !diaDoMes && "bg-gray-50/50 dark:bg-zinc-900/50"
                      )}>
                        {diaDoMes && (
                           <>
                             <div className="flex justify-end p-1">
                                <span className={clsx("text-sm w-6 h-6 flex items-center justify-center rounded-full font-medium", isHoje ? "bg-primary-color text-white" : "text-gray-600 dark:text-gray-400")}>
                                  {diaDoMes}
                                </span>
                             </div>
                             <div className="flex flex-col gap-1 mt-1">
                               {aulasNoDia.map(a => <div key={a.id}>{renderEventCard(a, true)}</div>)}
                             </div>
                           </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
          </div>
        </main>
      </div>

      <Sidebar page="Aulas" />
      
      {/* Modal */}
      <ModalAula aula={selectedAula} onClose={() => setSelectedAula(null)} />
    </div>
  );
}