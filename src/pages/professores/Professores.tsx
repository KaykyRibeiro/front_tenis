import { useState } from 'react';
import Sidebar from '../../components/navigation/Sidebar';
import clsx from 'clsx';

export default function Professores() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    
        const toggleTheme = () => {
            const newTheme = theme === "light" ? "dark" : "light";
            setTheme(newTheme);
            document.documentElement.classList.toggle("dark", newTheme === "dark")
        }
    return (
        <div className={clsx('flex flex-1 flex-col h-screen bg-gray-smooth dark:bg-black')}>
            <Sidebar page="Professores" tema={theme}/>
        </div>
    );
}