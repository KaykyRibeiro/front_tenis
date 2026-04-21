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
                'absolute z-50 top-0 left-0 h-screen bg-gray-smooth dark:bg-black-smooth transition-all duration-300 ease-in-out flex flex-col justify-between py-6 shadow-2xl overflow-hidden whitespace-nowrap',
                isHovered ? "w-64 px-4" : "w-20 px-3"
            )}>
            <div className="flex flex-col w-full">
                <div className="flex justify-center items-center w-full mb-8 h-20">
                    <img src={logoSrc} alt="Logo" className={clsx(
                        'transition-all duration-300 ease-in-out object-contain',
                        isHovered ? "w-auto h-20" : "w-auto h-10"
                    )} />
                </div>
                
                <div className='flex flex-col gap-2 w-full'>
                    <BtnSidebar icon={<House />} label="Home" expanded={isHovered} acctive={page === "Home"} rootNavigation="/home" />
                    <BtnSidebar icon={<LayoutDashboard />} label="Dashboard" expanded={isHovered} acctive={page === "Dashboard"} rootNavigation="/dashboard" />
                    <BtnSidebar icon={<NotebookTabs />} label="Aulas" expanded={isHovered} acctive={page === "Aulas"} rootNavigation="/aulas" />
                    <BtnSidebar icon={<SquareCenterlineDashedHorizontal />} label="Quadras" expanded={isHovered} acctive={page === "Quadras"} rootNavigation="/quadras" />
                    <BtnSidebar icon={<GraduationCap />} label="Alunos" expanded={isHovered} acctive={page === "Alunos"} rootNavigation="/alunos" />
                    <BtnSidebar icon={<IdCardLanyard />} label="Professores" expanded={isHovered} acctive={page === "Professores"} rootNavigation="/professores" />
                </div>
            </div>

            <div className="w-full flex justify-center">
                <BtnSidebar icon={<Settings />} label="Configurações" expanded={isHovered} acctive={page === "Configurações"} />
            </div>
        </div>
    );
}