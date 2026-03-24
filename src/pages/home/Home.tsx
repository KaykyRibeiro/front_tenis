import { useEffect, useState } from 'react';
import { homeService } from '../../service/homeService';
import clsx from 'clsx';
import UserCard from '../../components/cads/UserCard';
import Sidebar from '../../components/navigation/Sidebar';
import TempDatCard from '../../components/cads/TempDatCard';
import { Bell, Moon, Sun } from 'lucide-react';
import TabsNewAlunos from '../../components/Tabs/TabsNewAlunos';
import TabsAulasAgora from '../../components/Tabs/TabsAulasAgora';
import { useDarkMode } from '../../hooks/useDarkMode';
export default function Home() {
    const isDarkMode = useDarkMode();
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark")
    }

    const isDark = isDarkMode ? "dark" : "light";

    useEffect(() => {
        setTheme(isDark);
    }, [isDark]);

    const [novosAlunos, setNovosAlunos] = useState<any[]>([]);
    const [aulasAgora, setAulasAgora] = useState<any[]>([]);

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const data = await homeService.getUsuarios();
                console.log("DADOS DA API:", data);

                const formatted = data.map((user: any) => ({
                    id: user.usu_id,
                    name: user.usu_nome,
                    // photoUrl: user.usu_foto 
                    photoUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150",
                    whatsapp: user.usu_telefone
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
                const data = await homeService.getAulasAgora();
                console.log("AULAS:", data);

                const formatted = data.map((aula: any) => ({
                    name: aula.usuario?.usu_nome,
                    // photoUrl: aula.usuario?.usu_foto 
                    photoUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150",
                    hours: aula.age_data_inicio,
                    whatsapp: aula.usuario?.usu_telefone
                }));

                setAulasAgora(formatted);
            } catch (error) {
                console.error("Erro ao buscar aulas:", error);
            }
        }

        fetchAulasAgora();
    }, []);

    return (
        <div className={clsx('flex flex-1 flex-col h-screen bg-gray-smooth dark:bg-black')}>

            <div className='w-full h-2/12 flex flex-row items-center justify-between gap-4 p-4 pl-20'>
                <button
                    onClick={toggleTheme}
                    className='p-2 text-gray-800 dark:text-gray-200 focus:outline-none shadow-md rounded-full shadow-primary-color hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-black-smooth'
                >
                    {theme === "light" ? <Moon /> : <Sun />}
                </button>
                <div className='flex flex-row items-center justify-end gap-4 p-4 h-12/12'>
                    <Bell
                        className='text-black dark:text-gray-200 w-8 h-8 cursor-pointer'
                    />
                    <div className='border border-gray-400 h-8/12' />
                    <UserCard />
                </div>


            </div>
            <div className='w-full h-10/12 flex flex-row justify-start gap-4 '>
                <div className='flex flex-col justify-around  w-6/12 h-10/12 gap-4 ml-20 '>
                    <TempDatCard />
                    <div className='h-9/12'>
                        <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 '>Aulas Agora</h2>
                        <TabsAulasAgora users={aulasAgora} />
                    </div>
                </div>
                <div className='flex justify-end items-start w-6/12 pr-5'>
                    <TabsNewAlunos users={novosAlunos} />
                </div>
            </div>

            <Sidebar page="Home" />
        </div>
    );
}