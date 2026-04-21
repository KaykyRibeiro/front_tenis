import clsx from "clsx";
import { useNavigate } from "react-router-dom";

type BtnSidebarProps = {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  acctive?: boolean; // Tip: Corrige para "active" se for um erro de digitação
  rootNavigation?: string;
};

export default function BtnSidebar({
  icon,
  label,
  expanded,
  acctive,
  rootNavigation,
}: BtnSidebarProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => rootNavigation && navigate(rootNavigation)}
      className={clsx(
        "cursor-pointer flex items-center rounded-xl text-black dark:text-white transition-colors duration-200 ease-in-out w-full overflow-hidden",
        acctive
          ? "text-white bg-primary-color"
          : "hover:bg-gray-300 dark:hover:bg-gray-700",
      )}
    >
      <div className={clsx(
        "flex w-full items-center p-3 transition-all duration-300 ease-in-out",
        expanded ? "justify-start" : "justify-center"
      )}>
        <div className="shrink-0 flex items-center justify-center">
            {icon}
        </div>
        <span
          className={clsx(
            "transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden font-medium text-sm",
            expanded ? "max-w-[200px] opacity-100 ml-4" : "max-w-0 opacity-0 ml-0"
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
