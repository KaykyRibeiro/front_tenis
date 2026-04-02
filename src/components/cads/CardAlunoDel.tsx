import { X, AlertTriangle } from "lucide-react";

const mockAlunos = [
    { id: "1", nome: "Carlos Almeida Campos", email: "carlos.almeida@email.com", telefone: "(11) 98765-4321", nivel: "Intermediário", status: "Ativo", dataMatricula: "10/01/2023", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "2", nome: "Mariana Costa Silva", email: "mariana.costa@email.com", telefone: "(11) 91234-5678", nivel: "Avançado", status: "Ativo", dataMatricula: "15/03/2022", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "3", nome: "Rafael Souza Santos", email: "rafael.souza@email.com", telefone: "(11) 99876-1234", nivel: "Iniciante", status: "Inativo", dataMatricula: "05/08/2023", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['09:00', '13:00'] },
    { id: "4", nome: "Juliana Silva Pereira", email: "juliana.silva@email.com", telefone: "(11) 94567-8901", nivel: "Intermediário", status: "Ativo", dataMatricula: "22/11/2023", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "5", nome: "Lucas Pereira Santos", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024", foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] }
];

export default function CardAlunoDel({ id, setAcao }: { id: string, setAcao: (acao: string) => void }) {
    const handleClose = () => {
        setAcao("");
    }

    const handleDelete = () => {
        console.log("Deletar aluno", id);
        setAcao("");
    }

    const dados = mockAlunos.find((aluno) => aluno.id === id);

    if (!dados) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200">
                <div className="relative h-10">
                    <button onClick={handleClose} className="absolute top-4 right-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-black/20 dark:hover:bg-black/40 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white rounded-full p-2 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="px-8 pb-8 relative flex flex-col items-center text-center mt-2">
                    <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                    </div>
                
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Excluir Aluno</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                        Tem certeza que deseja excluir o aluno <strong>{dados.nome}</strong>? Esta ação não pode ser desfeita.
                    </p>
                    
                    <div className="w-full flex gap-3">
                        <button onClick={handleClose} className="flex-1 py-3 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors">
                            Cancelar
                        </button>
                        <button onClick={handleDelete} className="flex-1 py-3 rounded-xl font-medium text-white bg-rose-500 hover:bg-rose-600 shadow-sm shadow-rose-500/20 transition-colors">
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}