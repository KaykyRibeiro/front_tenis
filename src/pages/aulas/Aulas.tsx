import { useEffect, useState } from "react";
import Sidebar from "../../components/navigation/Sidebar";
import HeaAulas from "../../components/header/HeaAulas";
import ModalAula from "../../components/aulas/ModalAula";
import clsx from "clsx";
import { aulaService } from "../../service/aulaService";

export interface AulaProps {
  id: string;
  data: string;
  quadra: string;
  professor: { nome: string; foto: string };
  aluno: { nome: string; foto: string };
  nivel: "Iniciante" | "Intermediário" | "Avançado";
  status: "Agendada" | "Em andamento" | "Concluída" | "Cancelada";
}

const horaInicio = 6;
const horaFim = 22;

const horas = Array.from(
  { length: horaFim - horaInicio + 1 },
  (_, i) => `${(horaInicio + i).toString().padStart(2, "0")}:00`
);

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function Aulas() {
  const [view, setView] = useState<"hoje" | "semana" | "mes">("semana");
  const [aulas, setAulas] = useState<AulaProps[]>([]);
  const [selectedAula, setSelectedAula] = useState<AulaProps | null>(null);

  const [now, setNow] = useState(new Date());
  const hoje = now;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // BUSCAR E FORMATAR DADOS
  useEffect(() => {
    async function fetchAulas() {
      try {
        const data = await aulaService.getAulas();
        console.log(data);

        const aulasFormatadas = data.map((item: any) => ({
          id: String(item.age_id),
          data: item.age_data_inicio,

          quadra: `Quadra ${item.id_quadra}`,

          professor: {
            nome: "Professor",
            foto: "https://ui-avatars.com/api/?name=Professor",
          },

          aluno: {
            nome: item.usuario?.usu_nome || "Aluno",
            foto: `https://ui-avatars.com/api/?name=${item.usuario?.usu_nome}`,
          },

          nivel: "Iniciante",

          status:
            item.age_status === "AGENDADO"
              ? "Agendada"
              : item.age_status === "CANCELADO"
              ? "Cancelada"
              : "Concluída",
        }));

        setAulas(aulasFormatadas);
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
      }
    }

    fetchAulas();
  }, []);

  const getDiaSemana = (data: string) => new Date(data).getDay();

  const getHora = (data: string) =>
    new Date(data).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getDiaMes = (data: string) => new Date(data).getDate();

  const isHoje = (data: string) => {
    const d = new Date(data);
    return (
      d.getDate() === hoje.getDate() &&
      d.getMonth() === hoje.getMonth() &&
      d.getFullYear() === hoje.getFullYear()
    );
  };

  const isMesmaSemana = (data: string) => {
    const d = new Date(data);

    const inicio = new Date(hoje);
    inicio.setDate(hoje.getDate() - hoje.getDay());
    inicio.setHours(0, 0, 0, 0);

    const fim = new Date(inicio);
    fim.setDate(inicio.getDate() + 6);
    fim.setHours(23, 59, 59, 999);

    return d >= inicio && d <= fim;
  };

  const isMesmoMes = (data: string) => {
    const d = new Date(data);
    return (
      d.getMonth() === hoje.getMonth() &&
      d.getFullYear() === hoje.getFullYear()
    );
  };

  const capitalize = (text?: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const formatHoje = () => {
    const dia = hoje.getDate();

    const mes = hoje.toLocaleDateString("pt-BR", {
      month: "long",
    });

    const semana = hoje.toLocaleDateString("pt-BR", {
      weekday: "short",
    });

    return `${dia} de ${capitalize(mes)} (${capitalize(semana)})`;
  };

  const getSemanaRange = () => {
    const inicio = new Date(hoje);
    inicio.setDate(hoje.getDate() - hoje.getDay());

    const fim = new Date(inicio);
    fim.setDate(inicio.getDate() + 6);

    const mes = inicio.toLocaleDateString("pt-BR", {
      month: "long",
    });

    return `${inicio.getDate()} a ${fim.getDate()} de ${capitalize(mes)}`;
  };

  const formatMes = () => {
    const mes = hoje.toLocaleDateString("pt-BR", {
      month: "long",
    });

    const ano = hoje.getFullYear();

    return `${capitalize(mes)} ${ano}`;
  };

  const renderEventCard = (aula: AulaProps, compact = false) => {
    let colorClass =
      "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/40 dark:border-blue-800/50 dark:text-blue-300";

    if (aula.status === "Concluída")
      colorClass =
        "bg-green-100 border-green-200 text-green-800 dark:bg-green-900/40 dark:border-green-800/50 dark:text-green-300";

    if (aula.status === "Agendada")
      colorClass =
        "bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900/40 dark:border-yellow-800/50 dark:text-yellow-300";

    return (
      <div
        onClick={() => setSelectedAula(aula)}
        className={clsx(
          "w-full h-full p-2 border-l-4 rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-opacity flex flex-col justify-start overflow-hidden",
          colorClass,
          compact ? "min-h-[40px]" : "min-h-[70px]"
        )}
      >
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {aula.status}
        </span>

        {!compact && (
          <>
            <span className="text-xs font-semibold mt-1 truncate">
              {aula.aluno.nome}
            </span>
            <span className="text-[10px] opacity-80 truncate">
              • {aula.quadra}
            </span>
          </>
        )}

        {compact && (
          <span className="text-[10px] truncate">
            - {aula.aluno.nome}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-smooth dark:bg-black-smooth font-sans text-gray-900 dark:text-gray-100 flex overflow-hidden">
      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden transition-all duration-300">
        <header className="flex flex-col w-full">
          <HeaAulas />
        </header>

        <main className="flex-1 overflow-y-auto w-full p-6 flex flex-col">
          <div className="w-full max-w-[1400px] mx-auto mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {view === "hoje"
                ? formatHoje()
                : view === "semana"
                ? getSemanaRange()
                : formatMes()}
            </h2>

            <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg">
              {(["hoje", "semana", "mes"] as const).map((v) => (
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
                  {v === "hoje"
                    ? "Hoje"
                    : v === "semana"
                    ? "Semana"
                    : "Mês"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-[1400px] mx-auto w-full bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col overflow-hidden">

            {/* --- HOJE VIEW --- */}
            {view === "hoje" && (
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-[80px_1fr] border-b border-gray-100 dark:border-zinc-800">
                  <div className="p-4 border-r border-gray-100 dark:border-zinc-800"></div>
                  <div className="p-4 font-semibold text-center text-primary-color">
                    {formatHoje()}
                  </div>
                </div>

                {horas.map((hora) => (
                  <div
                    key={hora}
                    className="grid grid-cols-[80px_1fr] min-h-[100px] border-b border-gray-50 dark:border-zinc-800/50 group"
                  >
                    <div className="p-2 border-r border-gray-100 dark:border-zinc-800 text-xs text-gray-400 text-right">
                      {hora}
                    </div>

                    <div className="p-1 relative">
                      {(() => {
                        const aulasSlot = aulas.filter(
                          (a) => isHoje(a.data) && getHora(a.data) === hora
                        );

                        const h = parseInt(hora.split(":")[0]);
                        const isAlmoco = h >= 12 && h < 14;

                        return (
                          <>
                            {isAlmoco && aulasSlot.length === 0 && (
                              <div className="bg-red-100 border-l-4 border-red-400 text-red-700 p-2 rounded-md text-xs font-semibold">
                                🍽️ Almoço
                              </div>
                            )}

                            {aulasSlot.map((aula) => (
                              <div key={aula.id} className="h-full">
                                {renderEventCard(aula)}
                              </div>
                            ))}
                          </>
                        );
                      })()}
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

                  {diasSemana.map((dia, idx) => {
                    const inicioSemana = new Date(hoje);
                    inicioSemana.setDate(hoje.getDate() - hoje.getDay());

                    const dataDia = new Date(inicioSemana);
                    dataDia.setDate(inicioSemana.getDate() + idx);

                    const isHojeDia =
                      dataDia.getDate() === hoje.getDate() &&
                      dataDia.getMonth() === hoje.getMonth();

                    return (
                      <div
                        key={dia}
                        className="p-3 text-center border-r border-gray-200 dark:border-zinc-700 last:border-0 flex flex-col items-center justify-center"
                      >
                        <span className="text-xs text-gray-500 uppercase">{dia}</span>

                        <span
                          className={clsx(
                            "text-lg font-semibold mt-0.5 w-8 h-8 flex items-center justify-center rounded-full",
                            isHojeDia
                              ? "bg-primary-color text-white"
                              : "text-gray-700 dark:text-gray-200"
                          )}
                        >
                          {dataDia.getDate()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex-1 relative">
                  {horas.map((hora) => (
                    <div
                      key={hora}
                      className="grid grid-cols-[60px_repeat(7,1fr)] min-h-[80px] border-b border-gray-100 dark:border-zinc-800"
                    >
                      <div className="p-2 border-r border-gray-200 dark:border-zinc-700 text-[11px] text-gray-400 flex items-start justify-end pr-3">
                        {hora}
                      </div>

                      {Array.from({ length: 7 }).map((_, diaIdx) => {
                        const aulaNesteSlot = aulas.find(a =>
                          isMesmaSemana(a.data) &&
                          getDiaSemana(a.data) === diaIdx &&
                          getHora(a.data) === hora
                        );

                        const h = parseInt(hora.split(":")[0]);
                        const isAlmoco = h >= 12 && h < 14;

                        return (
                          <div
                            key={diaIdx}
                            className="border-r border-gray-100 dark:border-zinc-800 last:border-0 p-1 hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors"
                          >
                            {isAlmoco && !aulaNesteSlot && (
                              <div className="bg-red-100 border-l-4 border-red-400 text-red-700 p-1 rounded-md text-[10px] font-semibold text-center">
                                Almoço
                              </div>
                            )}

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
                {/* Header dias da semana */}
                <div className="grid grid-cols-7 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800">
                  {diasSemana.map((dia) => (
                    <div
                      key={dia}
                      className="p-2 text-center text-xs font-semibold text-gray-500 border-r border-gray-200 dark:border-zinc-800 last:border-0"
                    >
                      {dia}
                    </div>
                  ))}
                </div>

                {/* Grid do mês */}
                <div className="flex-1 grid grid-cols-7">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const primeiroDiaMes = new Date(
                      hoje.getFullYear(),
                      hoje.getMonth(),
                      1
                    ).getDay();

                    const diaDoMes = i - primeiroDiaMes + 1;

                    const diasNoMes = new Date(
                      hoje.getFullYear(),
                      hoje.getMonth() + 1,
                      0
                    ).getDate();

                    const isValido = diaDoMes > 0 && diaDoMes <= diasNoMes;

                    const isHojeDia = diaDoMes === hoje.getDate();

                    const aulasNoDia = aulas.filter(
                      (a) =>
                        isMesmoMes(a.data) &&
                        getDiaMes(a.data) === diaDoMes
                    );

                    //  CONTROLE DE LIMITE
                    const LIMITE = 3;
                    const eventosVisiveis = aulasNoDia.slice(0, LIMITE);
                    const eventosRestantes = aulasNoDia.length - LIMITE;

                    return (
                      <div
                        key={i}
                        className={clsx(
                          "border-b border-r border-gray-100 dark:border-zinc-800 p-1 min-h-[110px] max-h-[130px] overflow-hidden",
                          !isValido && "bg-gray-50/50 dark:bg-zinc-900/50"
                        )}
                      >
                        {isValido && (
                          <>
                            {/* Número do dia */}
                            <div className="flex justify-end p-1">
                              <span
                                className={clsx(
                                  "text-sm w-6 h-6 flex items-center justify-center rounded-full font-medium",
                                  isHojeDia
                                    ? "bg-primary-color text-white"
                                    : "text-gray-600 dark:text-gray-400"
                                )}
                              >
                                {diaDoMes}
                              </span>
                            </div>

                            {/* Eventos */}
                            <div className="flex flex-col gap-1 mt-1">
                              {eventosVisiveis.map((a) => (
                                <div key={a.id}>
                                  {renderEventCard(a, true)}
                                </div>
                              ))}

                              {/* + MAIS */}
                              {eventosRestantes > 0 && (
                                <span className="text-[10px] text-gray-500 px-1">
                                  +{eventosRestantes} mais
                                </span>
                              )}
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

      <ModalAula aula={selectedAula} onClose={() => setSelectedAula(null)} />
    </div>
  );
}