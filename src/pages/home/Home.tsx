import { useEffect, useState } from "react";
import { homeService } from "../../service/homeService";
import clsx from "clsx";
import UserCard from "../../components/cads/UserCard";
import Sidebar from "../../components/navigation/Sidebar";
import TempDatCard from "../../components/cads/TempDatCard";
import { Bell, Moon, Sun } from "lucide-react";
import TabsNewAlunos from "../../components/Tabs/TabsNewAlunos";
import TabsAulasAgora from "../../components/Tabs/TabsAulasAgora";
import { useDarkMode } from "../../hooks/useDarkMode";
export default function Home() {
  const isDarkMode = useDarkMode();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const isDark = isDarkMode ? "dark" : "light";

  useEffect(() => {
    setTheme(isDark);
  }, [isDark]);

  const [novosAlunos, setNovosAlunos] = useState<any[]>([]);
  const [aulasAgora, setAulasAgora] = useState<any[]>([]);

  useEffect(() => {
  async function fetchUsuarios() {
    try {
      const data = await homeService.getAlunos();

      const formatted = data
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) 
        .map((user: any) => ({
          id: user.usu_id,
          name: user.usu_nome,
          photoUrl:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150",
          whatsapp: user.usu_telefone,
        }));

      setNovosAlunos(formatted);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  fetchUsuarios();
}, []);

  useEffect(() => {
    async function fetchAulasAgora() {
      try {
        const data = await homeService.getAulasHoje();
        console.log("AULAS:", data);

        const formatted = data.map((aula: any) => ({
          name: aula.usuario?.usu_nome,
          // photoUrl: aula.usuario?.usu_foto
          photoUrl:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150",
          hours: new Date(aula.age_data_inicio).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          whatsapp: aula.usuario?.usu_telefone,
        }));

        setAulasAgora(formatted);
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
      }
    }

    fetchAulasAgora();
  }, []);

  return (
    <div
      className={clsx(
        "min-h-screen bg-gray-smooth dark:bg-black-smooth font-sans text-gray-900 dark:text-gray-100 flex overflow-hidden",
      )}
    >
      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden transition-all duration-300">
        {/* Header */}
        <header className="w-full flex items-center justify-between px-6 lg:px-10 py-4 bg-white/60 dark:bg-black-smooth backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
              Visão Geral
            </h1>
          </div>
          <div className="flex flex-row items-center justify-end gap-3 sm:gap-6">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-gray-600 dark:text-gray-300 focus:outline-none rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all active:scale-95"
              title="Alternar tema"
            >
              {theme === "light" ? (
                <Moon size={20} strokeWidth={1.5} />
              ) : (
                <Sun size={20} strokeWidth={1.5} />
              )}
            </button>
            <button className="relative p-2.5 text-gray-600 dark:text-gray-300 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-95">
              <Bell size={22} className="cursor-pointer" strokeWidth={1.5} />
              <span className="absolute top-2.5 right-3 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-900"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800 hidden sm:block" />
            <UserCard />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto w-full p-6 lg:p-10">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 2xl:gap-12 max-w-[1600px] mx-auto h-full min-h-[600px]">
            {/* Left Column */}
            <div className="xl:col-span-5 2xl:col-span-5 flex flex-col gap-8 h-full">
              <TempDatCard />

              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center justify-between mb-4 px-1">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                    Aulas Hoje
                  </h2>
                  <span className="text-xs font-semibold text-primary-color bg-primary-color/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {aulasAgora.length} aulas
                  </span>
                </div>
                <div className="flex-1">
                  <TabsAulasAgora users={aulasAgora} />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="xl:col-span-7 2xl:col-span-7 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                  Novos Alunos
                </h2>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {novosAlunos.length} registros
                </span>
              </div>
              <div className="flex-1 border border-transparent">
                <TabsNewAlunos users={novosAlunos} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Sidebar page="Home" />
    </div>
  );
}
