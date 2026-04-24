import { Plus } from "lucide-react";
import clsx from "clsx";
import Sidebar from "../../components/navigation/Sidebar";
import TabsAlunos from "../../components/Tabs/TabsAlunos";
import { useEffect, useState } from "react";
import CardAlunoInfo from "../../components/cads/CardAlunoInfo";
import CardAlunoEdit from "../../components/cads/CardAlunoEdit";
import CardAlunoDel from "../../components/cads/CardAlunoDel";
import { useNavigate } from "react-router-dom";
import { homeService } from "../../service/homeService";

export default function Alunos() {
  const [acao, setAcao] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [alunos, setAlunos] = useState<any[]>([]);

  const navigate = useNavigate();

  const receberAcao = (acao: string, id: string) => {
    setAcao(acao);
    setId(id);
  };

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const data = await homeService.getAlunos();
        console.log(data);
        

        const formatted = data.map((aluno: any) => ({
          id: aluno.usu_id,
          nome: aluno.usu_nome,
          email: aluno.usu_email,
          telefone: aluno.usu_telefone,
          nivel: aluno.usu_nivel,
          status: aluno.usu_status,
          dataMatricula: new Date(aluno.createdAt).toLocaleDateString("pt-BR"),
        }));

        setAlunos(formatted);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    }

    fetchAlunos();
  }, []);

  return (
    <div
      className={clsx(
        "min-h-screen bg-gray-smooth dark:bg-black-smooth font-sans text-gray-900 dark:text-gray-100 flex overflow-hidden",
      )}
    >
      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden transition-all duration-300">
        <header className="w-full flex md:flex-row flex-col justify-between px-6 lg:px-10 py-4 gap-4 md:items-center bg-white/60 dark:bg-black-smooth backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
              Gestão de Alunos
            </h1>
            <span className="text-xs font-semibold text-primary-color bg-primary-color/10 px-3 py-1 rounded-full uppercase tracking-wider">
              {alunos.length} registros
            </span>
          </div>
          <button
            onClick={() => navigate("/alunos/cadastro")}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-color text-white font-medium rounded-xl hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-primary-color/20"
          >
            <Plus size={18} />
            Novo Aluno
          </button>
        </header>

        <main className="flex-1 overflow-y-auto w-full p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto h-full flex flex-col">
            <TabsAlunos alunos={alunos} receberAcao={receberAcao} />
          </div>
        </main>
      </div>
      {acao === "ver" && <CardAlunoInfo id={id} setAcao={setAcao} />}
      {acao === "editar" && <CardAlunoEdit id={id} setAcao={setAcao} />}
      {acao === "excluir" && <CardAlunoDel id={id} setAcao={setAcao} />}
      <Sidebar page="Alunos" />
    </div>
  );
}
