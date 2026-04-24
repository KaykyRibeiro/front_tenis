import Sidebar from "../../components/navigation/Sidebar";
import HeaQuadras from "../../components/header/HeaQuadras";
import clsx from "clsx";
import CardQuadra, { type QuadraProps } from "../../components/cads/CardQuadra";
import { useEffect, useState } from "react";
import { quadraService } from "../../service/quadraService";
import { aulaService } from "../../service/aulaService";

export default function Quadras() {
  const [quadras, setQuadras] = useState<QuadraProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const quadrasData = await quadraService.getQuadras();
        const aulasData = await aulaService.getAulas();

        const hoje = new Date();

        const quadrasFormatadas = quadrasData.map((quadra: any) => {
          // 🔎 filtra aulas dessa quadra hoje
          const aulasHoje = aulasData.filter((a: any) => {
            const d = new Date(a.age_data_inicio);

            return (
              a.id_quadra === quadra.qua_id &&
              d.getDate() === hoje.getDate() &&
              d.getMonth() === hoje.getMonth() &&
              d.getFullYear() === hoje.getFullYear()
            );
          });

          // ⏰ horários do dia
          const horaInicio = 7;
          const horaFim = 22;

          const horariosHoje = Array.from(
            { length: horaFim - horaInicio + 1 },
            (_, i) => {
              const hora = `${(horaInicio + i).toString().padStart(2, "0")}:00`;

              const aula = aulasHoje.find((a: any) => {
                const horaAula =
                  new Date(a.age_data_inicio)
                    .getHours()
                    .toString()
                    .padStart(2, "0") + ":00";

                return horaAula === hora;
              });

              const horaNumero = horaInicio + i;
              const horaAlmocoInicio = 12;
              const horaAlmocoFim = 14;

              const isAlmoco =
                horaNumero >= horaAlmocoInicio && horaNumero < horaAlmocoFim;

              return {
                hora,
                disponivel:
                  !aula && !isAlmoco && quadra.qua_status !== "MANUTENCAO",

                detalhe:
                  quadra.qua_status === "MANUTENCAO"
                    ? "Manutenção"
                    : isAlmoco
                      ? "Almoço"
                      : aula
                        ? `Aula ${aula.usuario?.usu_nome}`
                        : undefined,
              };
            },
          );

          // 🟢 aula em andamento
          const agora = new Date();

          const aulaAtual = aulasHoje.find((a: any) => {
            const inicio = new Date(a.age_data_inicio);
            const fim = new Date(a.age_data_fim);

            return agora >= inicio && agora <= fim;
          });

          return {
            nome: quadra.qua_nome,
            foto: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6",

            aulaEmAndamento: aulaAtual
              ? {
                  professor: {
                    nome: "Professor", // depois você pode puxar do backend
                    foto: "https://ui-avatars.com/api/?name=Professor",
                  },
                  aluno: {
                    nome: aulaAtual.usuario?.usu_nome,
                    foto: `https://ui-avatars.com/api/?name=${aulaAtual.usuario?.usu_nome}`,
                  },
                }
              : undefined,

            horariosHoje,
          };
        });

        setQuadras(quadrasFormatadas);
      } catch (err) {
        console.error("Erro ao carregar quadras:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      className={clsx(
        "min-h-screen bg-gray-smooth dark:bg-black-smooth font-sans text-gray-900 dark:text-gray-100 flex overflow-hidden",
      )}
    >
      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden transition-all duration-300">
        <header className="flex flex-col w-full">
          <HeaQuadras />
        </header>

        <main className="flex-1 overflow-y-auto w-full p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto h-full flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quadras.map((quadra, index) => (
                <CardQuadra key={index} {...quadra} />
              ))}
            </div>
          </div>
        </main>
      </div>

      <Sidebar page="Quadras" />
    </div>
  );
}
