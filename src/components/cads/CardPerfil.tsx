import { SquarePen } from "lucide-react";

type PerfilProps = {
  nome: string;
  fotoUrl: string;
  status?: string;
  aulas: string[];
  disponibilidade: string[];
};

const getStatusStyle = (status?: string) => {
  switch (status) {
    case "ATIVO":
      return "bg-green-500 text-white";
    case "INATIVO":
      return "bg-yellow-500 text-white";
    case "BLOQUEADO":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

export default function CardPerfil({ nome, fotoUrl, status, aulas, disponibilidade }: PerfilProps) {
  return (
    <div className="flex flex-col items-center p-5 bg-white dark:bg-black-smooth w-8/12  rounded-lg shadow-md">
      <div className="w-full flex justify-between items-center">
        {status && (
          <span className={`${getStatusStyle(status)} p-2 rounded-xl mt-2`}>
            {status}
          </span>
        )}
        <button className="flex text-primary-color dark:text-green-500 items-center gap-2 px-4 py-2 border border-primary-color rounded-2xl hover:bg-primary-color hover:text-white transition-colors duration-300">
          <SquarePen />
          Editar
        </button>
      </div>
      <img src={fotoUrl} alt={nome} className="w-32 h-32 rounded-full object-cover mt-10" />
      <p className="font-light text-5xl text-black-smooth dark:text-white">{nome}</p>

      <div className="w-full mt-4 h-0.5 bg-gray-smooth dark:bg-black/30" />
      <div className="w-full mt-4 flex flex-col items-start">
        <h2 className="text-xl font-semibold text-black-smooth dark:text-white">Aulas</h2>
        <div className="flex justify-start w-full mt-2">
          <ul className="flex flex-row justify-around gap-4">
            {aulas && aulas.length > 0 ? (
              aulas.map((aula, index) => (
                <li className="border-2 border-primary-color text-primary-color dark:text-green-500 p-2 rounded-xl" key={index}>{aula}</li>
              ))
            ) : (
              <li className="w-full items-center text-gray-500">Sem aulas registradas</li>
            )}
          </ul>
        </div>

      </div>
      <div className="w-full mt-10 flex flex-col items-start">
        <h2 className="text-xl font-semibold text-black-smooth dark:text-white">Disponibilidade</h2>
        <div className="flex justify-start w-full mt-4">
          <ul className="flex flex-row justify-around gap-4">

            {disponibilidade && disponibilidade.length > 0 ? (
              disponibilidade.map((item, index) => (
                <li className="border-2 border-primary-color text-primary-color dark:text-green-500 p-2 rounded-xl" key={index}>{item}</li>
              ))
            ) : (
              <li className="w-full items-center text-gray-500">Sem disponibilidade registrada</li>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}