import { X, UserPlus, Phone, Mail, Award, Calendar, ToggleLeft } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const alunoSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(11, "Telefone deve ter pelo menos 11 caracteres"),
    nivel: z.string().min(1, "Nível é obrigatório"),
    status: z.string().min(1, "Status é obrigatório"),
    dataMatricula: z.string().min(1, "Data de matrícula é obrigatória"),
    foto: z.string().min(1, "Foto é obrigatória"),
    aulas: z.array(z.string()).min(1, "Aulas são obrigatórias"),
});

type AlunoData = z.infer<typeof alunoSchema>;   

const mockAlunos = [
    { id: "1", nome: "Carlos Almeida Campos", email: "carlos.almeida@email.com", telefone: "(11) 98765-4321", nivel: "Intermediário", status: "Ativo", dataMatricula: "10/01/2023", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "2", nome: "Mariana Costa Silva", email: "mariana.costa@email.com", telefone: "(11) 91234-5678", nivel: "Avançado", status: "Ativo", dataMatricula: "15/03/2022", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "3", nome: "Rafael Souza Santos", email: "rafael.souza@email.com", telefone: "(11) 99876-1234", nivel: "Iniciante", status: "Inativo", dataMatricula: "05/08/2023", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['09:00', '13:00'] },
    { id: "4", nome: "Juliana Silva Pereira", email: "juliana.silva@email.com", telefone: "(11) 94567-8901", nivel: "Intermediário", status: "Ativo", dataMatricula: "22/11/2023", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] },
    { id: "5", nome: "Lucas Pereira Santos", email: "lucas.pereira@email.com", telefone: "(11) 93456-7890", nivel: "Iniciante", status: "Ativo", dataMatricula: "12/02/2024", foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", aulas: ['10:00', '14:00'] }
];

export default function CardAlunoEdit({ id, setAcao }: { id: string, setAcao: (acao: string) => void }) {
    const dados = mockAlunos.find((aluno) => aluno.id === id);

    const { register, handleSubmit, formState: { errors } } = useForm<AlunoData>({
        resolver: zodResolver(alunoSchema),
        defaultValues: {
            nome: dados?.nome || "",
            email: dados?.email || "",
            telefone: dados?.telefone || "",
            nivel: dados?.nivel || "",
            status: dados?.status || "",
            dataMatricula: dados?.dataMatricula || "",
            foto: dados?.foto || "",
            aulas: dados?.aulas || [],
        }
    });

    const onSubmit = (data: AlunoData) => {
        console.log(data);
        handleClose();
    };

    const handleClose = () => {
        setAcao("");
    };

    if (!dados) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200">
                <div className="relative h-10">
                    <button onClick={handleClose} className="absolute top-4 right-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-black/20 dark:hover:bg-black/40 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white rounded-full p-2 transition-colors z-10">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="px-8 pb-8 relative -mt-4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                            Editar Aluno
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Atualize as informações de {dados.nome}</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><UserPlus className="w-3 h-3"/> Nome Completo</label>
                                <input
                                    type="text"
                                    {...register("nome")}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                />
                                {errors.nome && <span className="text-rose-500 text-xs mt-1 block">{errors.nome.message}</span>}
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><Mail className="w-3 h-3"/> Email</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                />
                                {errors.email && <span className="text-rose-500 text-xs mt-1 block">{errors.email.message}</span>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><Phone className="w-3 h-3"/> Telefone</label>
                                <input
                                    type="tel"
                                    {...register("telefone")}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                />
                                {errors.telefone && <span className="text-rose-500 text-xs mt-1 block">{errors.telefone.message}</span>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><Award className="w-3 h-3"/> Nível</label>
                                <select
                                    {...register("nivel")}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                >
                                    <option value="Iniciante">Iniciante</option>
                                    <option value="Intermediário">Intermediário</option>
                                    <option value="Avançado">Avançado</option>
                                </select>
                                {errors.nivel && <span className="text-rose-500 text-xs mt-1 block">{errors.nivel.message}</span>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><ToggleLeft className="w-3 h-3"/> Status</label>
                                <select
                                    {...register("status")}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                                {errors.status && <span className="text-rose-500 text-xs mt-1 block">{errors.status.message}</span>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><Calendar className="w-3 h-3"/> Data Matrícula</label>
                                <input
                                    type="text"
                                    {...register("dataMatricula")}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                />
                                {errors.dataMatricula && <span className="text-rose-500 text-xs mt-1 block">{errors.dataMatricula.message}</span>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                            <button type="button" onClick={handleClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20 transition-colors">
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}   