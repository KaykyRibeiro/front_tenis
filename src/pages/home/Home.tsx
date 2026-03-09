import { useState } from 'react';

import clsx from 'clsx';

import UserCard from '../../components/cads/UserCard';
import Sidebar from '../../components/navigation/Sidebar';
import TempDatCard from '../../components/cads/TempDatCard';
import { Bell, Moon, Sun } from 'lucide-react';
import TabsNewAlunos from '../../components/Tabs/TabsNewAlunos';
import TabsAulasAgora from '../../components/Tabs/TabsAulasAgora';
export default function Home() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark")
    }
    const novosAlunos = [
        {
            id: 1,
            name: "Ana Clara Silva",
            photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            whatsapp: "5511987654321",
        },
        {
            id: 2,
            name: "João Pedro Santos",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            whatsapp: "5514998765432",
        },
        // ...
    ];

    const aulasAgora = [
        {
            name: "Maria Fernanda Oliveira",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            hours: "10:00 - 11:00",
            whatsapp: "5511987654321",
        },
        {
            name: "João Silva",
            photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            hours: "11:00 - 12:00",
            whatsapp: "5514998765432",
        },
        {
            name: "Ana Clara Silva",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            hours: "12:00 - 13:00",
            whatsapp: "5511987654321",
        },
        {
            name: "João Pedro Santos",
            photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            hours: "13:00 - 14:00",
            whatsapp: "5514998765432",
        },
        {
            name: "Lucas Oliveira",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            hours: "14:00 - 15:00",
            whatsapp: "5511987654321",
        },
        {
            name: "Maria Fernanda Oliveira",
            photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            hours: "15:00 - 16:00",
            whatsapp: "5511987654321",
        },
        // ...
    ];


    return (
        <div className={clsx('flex flex-1 flex-col h-screen bg-gray-smooth dark:bg-black')}>

            <div className='w-full h-2/12 flex flex-row items-center justify-between gap-4 p-4 pl-20'>
                <button
                    onClick={toggleTheme}
                    className='p-2   text-gray-800 dark:text-gray-200 focus:outline-none shadow-md rounded-full shadow-primary-color hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-black-smooth'
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

            <Sidebar page="Home" tema={theme} />
        </div>
    );
}