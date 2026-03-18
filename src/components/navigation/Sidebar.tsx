import {  useEffect, useState } from 'react';
import { clsx } from 'clsx';
import BtnSidebar from '../Buttons/BtnSidebar';
import { GraduationCap, House, IdCardLanyard, LayoutDashboard, NotebookTabs, Settings, SquareCenterlineDashedHorizontal } from "lucide-react";

import { useDarkMode } from '../../hooks/useDarkMode';

type SidebarProps = {
    page: string;

}
export default function Sidebar({ page }: SidebarProps) {
    const isDarkMode = useDarkMode();
    const [isHovered, setIsHovered] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const isDark = isDarkMode ? "dark" : "light";

    useEffect(() => {
        setTheme(isDark);
    }, [isDark]);


    const logoSrc = theme === "light" ? "/public/logo/logo-p-branco.png" : "/public/logo/logo-p-preto.png";


    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                'absolute top-0 left-0 h-screen bg-gray-smooth  dark:bg-black-smooth transition-all duration-300 ease-in-out flex flex-col items-center justify-between gap-4 pt-8 py-2 shadow-2xl',
                // hover foda para caralho 
                isHovered ? "w-44 " : "w-16 "
            )}>
            <div>
                <div className="flex justify-center items-center  w-auto rounded-2xl">
                    <img src={logoSrc} alt="Logo" className={clsx(
                        'transition-all duration-300 ease-in-out',
                        // hover foda para caralho 
                        isHovered ? "w-auto h-32 mb-4" : "w-auto h-12 mb-20"
                    )} />
                </div>
                <div className='flex flex-col items-center gap-8 px-2'>
                    <BtnSidebar icon={<House />} label="Home" expanded={isHovered} acctive={page === "Home" ? true : false} rootNavigation="/home" />
                    <BtnSidebar icon={<LayoutDashboard />} label="Dashboard" expanded={isHovered} acctive={page === "Dashboard" ? true : false} rootNavigation="/dashboard" />
                    <BtnSidebar icon={<NotebookTabs />} label="Aulas" expanded={isHovered} acctive={page === "Aulas" ? true : false} rootNavigation="/aulas" />
                    <BtnSidebar icon={<SquareCenterlineDashedHorizontal />} label="Quadras" expanded={isHovered} acctive={page === "Quadras" ? true : false} rootNavigation="/quadras" />
                    <BtnSidebar icon={<GraduationCap />} label="Alunos" expanded={isHovered} acctive={page === "Alunos" ? true : false} rootNavigation="/alunos" />
                    <BtnSidebar icon={<IdCardLanyard />} label="Professores" expanded={isHovered} acctive={page === "Professores" ? true : false} rootNavigation="/professores" />
                </div>

            </div>

            <div>
                <BtnSidebar icon={<Settings />} label="Configurações" expanded={isHovered} acctive={page === "Configurações" ? true : false} />
            </div>

        </div>
    );
}