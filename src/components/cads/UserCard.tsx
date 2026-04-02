import { useNavigate } from "react-router-dom";

export default function UserCard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex flex-row items-center gap-4 cursor-pointer p-2 pr-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all duration-200"
      onClick={() => navigate("/profile")}
    >
      <div className="hidden sm:flex flex-col justify-center items-end">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">Bem-vindo</p>
        <h2 className="text-md font-semibold text-gray-900 dark:text-gray-100">{user?.usu_nome || "Usuário"}</h2>
      </div>
      <div className="relative">
        <img src="/public/icons/icon-persom.png" alt="Profile" className="w-11 h-11 rounded-full object-cover ring-2 ring-primary-color/20 dark:ring-primary-color/40" />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black"></span>
      </div>
    </div>
  );
}