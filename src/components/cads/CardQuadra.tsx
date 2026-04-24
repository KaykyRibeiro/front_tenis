import clsx from "clsx";
import { Clock } from "lucide-react";

export interface Horario {
  hora: string;
  disponivel: boolean;
  detalhe?: string;
}

export interface QuadraProps {
  foto: string;
  nome: string;
  aulaEmAndamento?: {
    professor: { nome: string; foto: string };
    aluno: { nome: string; foto: string };
  };
  horariosHoje: Horario[];
}

export default function CardQuadra({
  foto,
  nome,
  aulaEmAndamento,
  horariosHoje,
}: QuadraProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Foto da Quadra */}
      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={foto}
          alt={`Foto da ${nome}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          {nome}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Header - Nome da Quadra */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {nome}
          </h2>
        </div>

        {/* Aula em Andamento */}
        <div className="h-[90px]">
          {aulaEmAndamento ? (
            <div className="bg-primary-color/5 dark:bg-primary-color/10 rounded-xl p-3 border border-primary-color/20 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-primary-color uppercase tracking-wider">
                  Aula em Andamento
                </span>
                <div className="flex -space-x-3 mt-1">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 object-cover z-10"
                    src={aulaEmAndamento.professor.foto}
                    alt={aulaEmAndamento.professor.nome}
                    title={`Professor: ${aulaEmAndamento.professor.nome}`}
                  />
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 object-cover z-0"
                    src={aulaEmAndamento.aluno.foto}
                    alt={aulaEmAndamento.aluno.nome}
                    title={`Aluno: ${aulaEmAndamento.aluno.nome}`}
                  />
                </div>
              </div>
              <div className="text-right flex flex-col text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium truncate max-w-[100px]">
                  Prof. {aulaEmAndamento.professor.nome.split(" ")[0]}
                </span>
                <span className="text-xs text-gray-500">
                  {aulaEmAndamento.aluno.nome.split(" ")[0]}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-3 border border-dashed border-gray-300 dark:border-zinc-700 h-full flex flex-col items-center justify-center text-gray-400">
              <span className="text-sm font-medium">Quadra Livre</span>
            </div>
          )}
        </div>

        <hr className="border-gray-100 dark:border-zinc-800 my-1" />

        {/* Horários / Disponibilidade de Hoje */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Agenda de Hoje
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {horariosHoje.map((horario, index) => {
              const isAlmoco = horario.detalhe === "Almoço";

              return (
                <div
                  key={index}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between",

                    isAlmoco &&
                      "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400",

                    !isAlmoco &&
                      horario.disponivel &&
                      "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400",

                    !isAlmoco &&
                      !horario.disponivel &&
                      "bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400",
                  )}
                >
                  <span>{horario.hora}</span>
                  <span className="truncate ml-2 max-w-[70px]">
                    {isAlmoco
                      ? "Almoço"
                      : horario.disponivel
                        ? "Livre"
                        : horario.detalhe || "Ocupado"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
