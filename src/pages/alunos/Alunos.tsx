import { Plus } from 'lucide-react';
import clsx from 'clsx';
import Sidebar from '../../components/navigation/Sidebar';
import TabsAlunos from '../../components/Tabs/TabsAlunos';
import { useState } from 'react';
import CardAlunoInfo from '../../components/cads/CardAlunoInfo';
import CardAlunoEdit from '../../components/cads/CardAlunoEdit';
import CardAlunoDel from '../../components/cads/CardAlunoDel';
import { useNavigate } from 'react-router-dom';

const mockAlunos = [
    { id: "1", nome: "Carlos Almeida", email: "carlos.almeida@email.com", telefone: "(11) 98765-4321", nivel: "Intermediário", status: "Ativo", dataMatricula: "10/01/2023" },
    { id: "2", nome: "Mariana Costa", email: "mariana.costa@email.com", telefone: "(11) 91234-5678", nivel: "Avançado", status: "Ativo", dataMatricula: "15/03/2022" },
    { id: "3", nome: "Rafael Souza", email: "rafael.souza@email.com", telefone: "(11) 99876-1234", nivel: "Iniciante", status: "Inativo", dataMatricula: "05/08/2023" },
    { id: "4", nome: "Juliana Silva", email: "juliana.silva@email.com", telefone: "(11) 94567-8901", nivel: "Intermediário", status: "Ativo", dataMatricula: "22/11/2023" },
    { id: "5", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "6", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "7", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "8", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "9", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "10", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "11", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "12", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "13", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "14", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "15", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "16", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "17", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "18", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "19", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "20", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "21", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "22", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "23", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "24", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" },
    { id: "25", nome: "Lucas Pereira", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024" }
];



export default function Alunos() {
    const [acao, setAcao] = useState<string>("");
    const [id, setId] = useState<string>("");

    const navigate = useNavigate();

    const receberAcao = (acao: string, id: string) => {
        setAcao(acao);
        setId(id);
    }
    return (
        <div className={clsx('min-h-screen bg-gray-smooth dark:bg-black-smooth font-sans text-gray-900 dark:text-gray-100 flex overflow-hidden')}>
            <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden transition-all duration-300">
                <header className="w-full flex md:flex-row flex-col justify-between px-6 lg:px-10 py-4 gap-4 md:items-center bg-white/60 dark:bg-black-smooth backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50">
                    <div className="flex flex-row items-center gap-4">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                            Gestão de Alunos
                        </h1>
                        <span className="text-xs font-semibold text-primary-color bg-primary-color/10 px-3 py-1 rounded-full uppercase tracking-wider">
                            {mockAlunos.length} registros
                        </span>
                    </div>
                    <button 
                        onClick={() => navigate("/alunos/cadastro")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary-color text-white font-medium rounded-xl hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-primary-color/20">
                        <Plus size={18} />
                        Novo Aluno
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto w-full p-6 lg:p-10">
                    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
                        <TabsAlunos mockAlunos={mockAlunos} receberAcao={receberAcao} />
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