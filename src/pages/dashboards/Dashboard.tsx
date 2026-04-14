import Sidebar from "../../components/navigation/Sidebar";
import HeaDashboard from "../../components/header/HeaDashboard";
import clsx from "clsx";
import { Users, GraduationCap, SquareCenterlineDashedHorizontal, Calendar, TrendingUp, TrendingDown, Clock } from "lucide-react";

export default function Dashboard() {
  const kpis = [
    { title: "Total de Alunos", value: "320", trend: "+12%", up: true, icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { title: "Professores Ativos", value: "14", trend: "+2", up: true, icon: Users, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { title: "Quadras em Uso", value: "7/12", trend: "58%", up: true, icon: SquareCenterlineDashedHorizontal, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" },
    { title: "Aulas Agendadas Hoje", value: "48", trend: "-5%", up: false, icon: Calendar, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
  ];

  const quadrasOccupation = [
    { nome: "Quadra 1 - Saibro", perc: 85 },
    { nome: "Quadra 2 - Rápida", perc: 60 },
    { nome: "Quadra 3 - Coberta", perc: 95 },
    { nome: "Quadra 4 - Saibro", perc: 30 },
  ];

  return (
    <div className={clsx("min-h-screen bg-gray-smooth dark:bg-black-smooth font-sans text-gray-900 dark:text-gray-100 flex overflow-hidden")}>
      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden transition-all duration-300">
        <header className="flex flex-col w-full">
          <HeaDashboard />
        </header>

        <main className="flex-1 overflow-y-auto w-full p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto h-full flex flex-col gap-6">
            
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {kpis.map((kpi, index) => (
                <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.title}</span>
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{kpi.value}</span>
                      <div className={clsx("flex items-center gap-1 text-sm font-medium mb-1", kpi.up ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400")}>
                        {kpi.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{kpi.trend}</span>
                      </div>
                    </div>
                  </div>
                  <div className={clsx("p-4 rounded-full", kpi.bg, kpi.color)}>
                    <kpi.icon className="w-7 h-7" />
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Occupation Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Taxa de Ocupação das Quadras (Hoje)</h3>
                <div className="flex flex-col gap-5 flex-1 justify-center relative">
                  {quadrasOccupation.map((q, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{q.nome}</span>
                        <span className="font-bold text-gray-500 dark:text-gray-400">{q.perc}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
                        <div 
                          className={clsx("h-full rounded-full transition-all duration-1000 ease-out", q.perc > 80 ? "bg-red-500" : q.perc > 50 ? "bg-yellow-500" : "bg-primary-color")}
                          style={{ width: `${q.perc}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Classes */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Próximas Aulas</h3>
                  <button className="text-sm font-semibold text-primary-color hover:underline">Ver todas</button>
                </div>
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map(item => (
                    <div key={item} className="flex gap-4 items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 border border-transparent hover:border-gray-100 dark:hover:border-zinc-700 transition-colors">
                       <div className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-800 overflow-hidden shadow-sm">
                          <img src={`https://ui-avatars.com/api/?name=Aluno+${item}&background=random&color=fff`} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex flex-col flex-1">
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Aluno {item}</span>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                             <Clock className="w-3.5 h-3.5" /> <span>14:00 - Quadra {item}</span>
                          </div>
                       </div>
                       <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-md border border-yellow-200 dark:border-yellow-900/50">Agendada</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
      <Sidebar page="Dashboard" />
    </div>
  );
}