import clsx from "clsx";
import { useNavigate } from "react-router-dom";

type BtnSidebarProps = {
    icon: React.ReactNode;
    label: string;
    expanded: boolean;
    acctive?: boolean;
    rootNavigation?: string;
}
const navigate = useNavigate();
export default function BtnSidebar({ icon, label, expanded, acctive, rootNavigation }: BtnSidebarProps) {
    return (
        <div 
        onClick={() => rootNavigation && navigate(rootNavigation)}
        className={clsx("cursor-pointer overflow-hidden flex rounded-xl  text-black ", 
        expanded ? "w-43" : "w-14 items-center justify-center", 
        acctive ? " text-white bg-primary-color" : "hover:bg-gray-300")}>
            <div className="flex flex-row p-2 rounded-2xl">
                {icon}
                <span className={clsx(
                    "whitespace-nowrap transition-opacity duration-300 ease-in-out ml-2",
                    // O texto aparece/some e ganha opacidade condicionalmente bem gay
                    expanded ? "opacity-100 w-auto display-block" : " hidden "
                )}>
                    {label}
                </span>
            </div>
        </div>

    );
}