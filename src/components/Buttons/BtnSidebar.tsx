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
  const navigate = useNavigate(); // Agora dentro da função!

  return (
    <div
      onClick={() => rootNavigation && navigate(rootNavigation)}
      className={clsx(
        "cursor-pointer overflow-hidden flex rounded-xl  text-black dark:text-white transition-all duration-300 ease-in-out",
        expanded ? "w-43" : "w-14 items-center justify-center",
        acctive
          ? " text-white bg-primary-color"
          : "hover:bg-gray-300 dark:hover:bg-gray-700",
      )}
    >
      <div className="flex flex-row p-2 rounded-2xl">
        {icon}
        <span
          className={clsx(
            "whitespace-nowrap transition-opacity duration-300 ease-in-out ml-2",
            // O texto aparece/some e ganha opacidade condicionalmente
            expanded ? "opacity-100 w-auto block" : "hidden", // Corrigi "display-block" para "block" (assumindo Tailwind; se não, use "inline-block" ou o que precisar)
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
