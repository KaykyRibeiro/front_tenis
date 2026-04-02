import { X, Phone, Calendar, Clock, BarChart2 } from "lucide-react";

const mockAlunos = [
    { id: "1", nome: "Carlos Almeida Campos", email: "carlos.almeida@email.com", telefone: "(11) 98765-4321", nivel: "Intermediário", status: "Ativo", dataMatricula: "10/01/2023", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "2", nome: "Mariana Costa Silva", email: "mariana.costa@email.com", telefone: "(11) 91234-5678", nivel: "Avançado", status: "Ativo", dataMatricula: "15/03/2022", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "3", nome: "Rafael Souza Santos", email: "rafael.souza@email.com", telefone: "(11) 99876-1234", nivel: "Iniciante", status: "Inativo", dataMatricula: "05/08/2023", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['09:00', '13:00'] },
    { id: "4", nome: "Juliana Silva Pereira", email: "juliana.silva@email.com", telefone: "(11) 94567-8901", nivel: "Intermediário", status: "Ativo", dataMatricula: "22/11/2023", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "5", nome: "Lucas Pereira Santos", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024", foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00', '16:00'] }
];

export default function CardAlunoInfo({ id, setAcao }: { id: string, setAcao: (acao: string) => void }) {
    const handleClose = () => {
        setAcao("");
    }

    const dados = mockAlunos.find((aluno) => aluno.id === id);

    if (!dados) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 ">
                    <h2 className="text-xl font-light text-slate-900 dark:text-white">Informações do Aluno</h2>
                    <button onClick={handleClose} className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>


                <div className="px-6 pb-6 relative">
                    <div className="top-6 left-6">
                        <img src={dados.foto} alt={dados.nome} className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-900 object-cover shadow-md bg-zinc-100 dark:bg-zinc-800" />
                    </div>

                    <div className="mt-10 mb-6 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{dados.nome}</h1>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{dados.email}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${dados.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'}`}>
                            {dados.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1">
                                <Phone className="w-4 h-4 text-zinc-400" />
                                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Telefone</span>
                            </div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dados.telefone}</p>
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1">
                                <BarChart2 className="w-4 h-4 text-zinc-400" />
                                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Nível</span>
                            </div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dados.nivel}</p>
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-4 h-4 text-zinc-400" />
                                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Matrícula</span>
                            </div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dados.dataMatricula}</p>
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-zinc-400" />
                                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Aulas Hoje</span>
                            </div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dados.aulas.length > 0 ? dados.aulas.join(', ') : 'Nenhuma'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}