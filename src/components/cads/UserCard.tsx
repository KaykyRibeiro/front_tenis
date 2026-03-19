import { useNavigate } from "react-router-dom";

export default function UserCard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex flex-row gap-4 cursor-pointer"
      onClick={() => navigate("/profile")}
    >
      <div className="flex flex-col justify-end items-end">
        <p className="text-sm text-gray-900 dark:text-white">Bem-vindo</p>
        <h2 className="text-lg font-normal  text-black dark:text-gray-200">{user?.usu_nome}</h2>
      </div>
      <img src="/public/icons/icon-persom.png" alt="" className="w-12 h-12 rounded-3xl" />
    </div>
  );
}