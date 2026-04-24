import { Search, Filter, Edit, Trash2, Eye, User, Mail, Phone, Calendar, SearchX } from "lucide-react";
import { clsx } from "clsx";
import { useState } from 'react';

interface Aluno {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    nivel: string; // Iniciante, Intermediário, Avançado
    status: string; // Ativo, Inativo
    dataMatricula: string;
    avatar?: string;
}

type Props = {
    alunos: Aluno[];
    receberAcao: (acao: string, id: string) => void;
};



export default function TabsAlunos({ alunos, receberAcao }: Props){
    const [searchTerm, setSearchTerm] = useState("");
    const [filterNivel, setFilterNivel] = useState("Todos");

    
    const filteredAlunos = alunos.filter((aluno) => {
    const nome = aluno.nome || "";
    const email = aluno.email || "";

    const matchesSearch =
        nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNivel =
        filterNivel === "Todos" || aluno.nivel === filterNivel;

    return matchesSearch && matchesNivel;
});

    const getStatusStyles = (status: string) => {
        return status === "ATIVO"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
            : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30";
    };

    const getNivelStyles = (nivel: string) => {
        if (nivel === "Iniciante") return "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400";
        if (nivel === "Intermediário") return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400";
    };

    const enviarAcao = (acao: string, id: string) => {
        receberAcao(acao, id);
    }
    return (
        <div>
            {/* Filters and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white dark:bg-zinc-900/50 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar aluno por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-black/40 border-0 text-slate-900 dark:text-white text-sm rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                        <Filter className="w-5 h-5" />
                    </div>
                    <select
                        value={filterNivel}
                        onChange={(e) => setFilterNivel(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-black/40 border-0 text-slate-900 dark:text-white text-sm rounded-xl pl-12 pr-10 py-3.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                    >
                        <option value="Todos">Todos os Níveis</option>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white/80 dark:bg-black-smooth/80 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-zinc-800/50 shadow-xl overflow-hidden flex flex-col
                /* Largura da barra */
                [&::-webkit-scrollbar]:w-2 
                dark:[&::-webkit-scrollbar-track]:bg-gray-800/30 
                dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
                [&::-webkit-scrollbar-track]:bg-gray-50 
                [&::-webkit-scrollbar-thumb]:bg-gray-300 
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb:hover]:bg-gray-400
            ">
                <div className="overflow-x-auto overflow-y-auto h-[calc(80vh-250px)] w-full">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-black-smooth/50 border-b border-slate-200 dark:border-white/5">
                                <th className="py-5 px-6 font-semibold text-slate-500 dark:text-slate-400 text-sm">Aluno</th>
                                <th className="py-5 px-6 font-semibold text-slate-500 dark:text-slate-400 text-sm">Contato</th>
                                <th className="py-5 px-6 font-semibold text-slate-500 dark:text-slate-400 text-sm">Nível</th>
                                <th className="py-5 px-6 font-semibold text-slate-500 dark:text-slate-400 text-sm">Status</th>
                                <th className="py-5 px-6 font-semibold text-slate-500 dark:text-slate-400 text-sm">Matrícula</th>
                                <th className="py-5 px-6 font-semibold text-slate-500 dark:text-slate-400 text-sm text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlunos.length > 0 ? (
                                filteredAlunos.map((aluno) => (
                                    <tr
                                        key={aluno.id}
                                        className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors group"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shadow-sm">
                                                    {aluno.nome.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900 dark:text-slate-200">
                                                        {aluno.nome}
                                                    </div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                                        <User className="w-3 h-3" /> ID: #{String(aluno.id).padStart(4, '0')}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                                            <div className="flex flex-col gap-1">
                                                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {aluno.email}</span>
                                                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {aluno.telefone}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={clsx("px-3 py-1 rounded-full text-xs font-medium", getNivelStyles(aluno.nivel) )}>
                                                {aluno.nivel || "-"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">

                                            <span className={clsx("flex items-center gap-2 text-xs font-medium rounded-2xl p-2", getStatusStyles(aluno.status))}>
                                                <span className={clsx("w-2 h-2 rounded-full", aluno.status?.toUpperCase() === "ATIVO" ? "bg-emerald-500" : "bg-rose-500")} />
                                                {aluno.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {aluno.dataMatricula}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    title="Ver Perfil" 
                                                    onClick={() => enviarAcao("ver", aluno.id)}
                                                    className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    title="Editar" 
                                                    onClick={() => enviarAcao("editar", aluno.id)}
                                                    className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    title="Excluir" 
                                                    onClick={() => enviarAcao("excluir", aluno.id)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                                            <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-full mb-4">
                                                <SearchX className="w-8 h-8 opacity-50" />
                                            </div>
                                            <p className="text-lg font-medium">Nenhum aluno encontrado</p>
                                            <p className="text-sm mt-1">Tente ajustar seus filtros de busca para encontrar o que procura.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination placeholder */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-sm text-slate-500">
                    <span>Mostrando {filteredAlunos.length} de {alunos.length} alunos</span>
                </div>
            </div>
        </div>
    );
}