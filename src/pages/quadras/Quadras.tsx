import Sidebar from "../../components/navigation/Sidebar";
import HeaQuadras from "../../components/header/HeaQuadras";
import clsx from "clsx";
import CardQuadra, { type QuadraProps } from "../../components/cads/CardQuadra";

const mockQuadras: QuadraProps[] = [
  {
    nome: "Quadra 1 - Saibro",
    foto: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=2070&auto=format&fit=crop",
    aulaEmAndamento: {
      professor: {
        nome: "Carlos Silva",
        foto: "https://ui-avatars.com/api/?name=Carlos+Silva&background=22c55e&color=fff",
      },
      aluno: {
        nome: "Ana Souza",
        foto: "https://ui-avatars.com/api/?name=Ana+Souza&background=3b82f6&color=fff",
      },
    },
    horariosHoje: [
      { hora: "08:00", disponivel: false, detalhe: "Aula Prof. Carlos" },
      { hora: "09:00", disponivel: false, detalhe: "Aula Prof. Carlos" },
      { hora: "10:00", disponivel: true },
      { hora: "11:00", disponivel: false, detalhe: "Locação" },
    ],
  },
  {
    nome: "Quadra 2 - Rápida",
    foto: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2072&auto=format&fit=crop",
    horariosHoje: [
      { hora: "08:00", disponivel: true },
      { hora: "09:00", disponivel: false, detalhe: "Locação" },
      { hora: "10:00", disponivel: true },
      { hora: "11:00", disponivel: true },
    ],
  },
  {
    nome: "Quadra 3 - Coberta",
    foto: "https://images.unsplash.com/photo-1542144582-1ba004ac6b53?q=80&w=1974&auto=format&fit=crop",
    aulaEmAndamento: {
      professor: {
        nome: "Marcos Lima",
        foto: "https://ui-avatars.com/api/?name=Marcos+Lima&background=22c55e&color=fff",
      },
      aluno: {
        nome: "Roberto Alves",
        foto: "https://ui-avatars.com/api/?name=Roberto+Alves&background=3b82f6&color=fff",
      },
    },
    horariosHoje: [
      { hora: "08:00", disponivel: false, detalhe: "Manutenção" },
      { hora: "09:00", disponivel: false, detalhe: "Manutenção" },
      { hora: "10:00", disponivel: false, detalhe: "Aula Prof. Marcos" },
      { hora: "11:00", disponivel: true },
    ],
  },
];

export default function Quadras() {
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
              {mockQuadras.map((quadra, index) => (
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
