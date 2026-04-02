import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usuarioService } from "../../service/usuarioService";

const professorSchema = z.object({
    nome: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }).max(100).nonempty("O nome é obrigatório"),
    email: z.string().email().nonempty("O email é obrigatório"),
    telefone: z.string().min(10, { message: "O telefone deve ter pelo menos 10 caracteres" }).max(15).nonempty("O telefone é obrigatório"),
    senha: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }).max(100).nonempty("A senha é obrigatória"),
    confirmarSenha: z.string().min(6, { message: "Confirmar a senha deve ter pelo menos 6 caracteres" }).max(100).nonempty("Confirmar a senha é obrigatório"),
});

type ProfessorFormData = z.infer<typeof professorSchema>;

export default function FormsNewProfessor() {
    const navigate = useNavigate();
    const [erro, setErro] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const confirmarSenhaValidation = (data: ProfessorFormData) => {
        if (data.senha !== data.confirmarSenha) {
            setErro("As senhas não coincidem.");
            return false;
        }
        setErro(null);
        return onSubmit(data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm<ProfessorFormData>({
        resolver: zodResolver(professorSchema),
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            senha: "",
            confirmarSenha: "",
        }
    });

    const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const onSubmit = async (data: ProfessorFormData) => {
        try {
            const payload = {
                usu_nome: data.nome,
                usu_email: data.email,
                usu_telefone: data.telefone,
                usu_senhaHash: data.senha,
                usu_status: "ATIVO",
                id_tipo_usuario: 5,
            };

            await usuarioService.createProfessor(payload);

            console.log("Professor cadastrado com sucesso!");
            navigate("/professores");

        } catch (error) {
            console.error(error);
            setErro("Erro ao cadastrar professor");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-5xl justify-center z-10 p-4">

            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-2xl p-8 sm:p-10 rounded-3xl w-full max-w-xl">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Novo Professor</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-center text-sm">Insira as informações do professor para cadastrá-lo na plataforma.</p>
                </div>

                <form onSubmit={handleSubmit(confirmarSenhaValidation)} className="space-y-5">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5">Nome Completo</label>
                        <input
                            {...register("nome")}
                            type="text"
                            id="nome"
                            className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm"
                            placeholder="Ex: João Silva"
                        />
                        {errors.nome && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.nome.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="fotoUrl" className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5">Foto de Perfil</label>
                        <input
                            type="file"
                            id="fotoUrl"
                            accept="image/*"
                            onChange={handleImagePreview}
                            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary-color/10 file:text-primary-color hover:file:bg-primary-color/20 transition-all border border-gray-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900/80 shadow-sm" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                placeholder="exemplo@email.com"
                                className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm" />
                            {errors.email && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="telefone" className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5">Telefone</label>
                            <input
                                {...register("telefone")}
                                type="tel" id="telefone"
                                placeholder="(00) 00000-0000"
                                className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm" />
                            {errors.telefone && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.telefone.message}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="senha" className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5">Senha</label>
                            <input
                                {...register("senha")}
                                type="password"
                                id="senha"
                                placeholder="••••••••"
                                className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm" />
                            {errors.senha && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.senha.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="confirmarSenha" className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5">Confirmar Senha</label>
                            <input
                                {...register("confirmarSenha")}
                                type="password" id="confirmarSenha"
                                placeholder="••••••••"
                                className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm" />
                            {errors.confirmarSenha && <span className="text-xs text-red-500 mt-1 font-medium block">{errors.confirmarSenha.message}</span>}
                        </div>
                    </div>

                    {erro && <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">{erro}</div>}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-700/50 mt-6">
                        <button type="button" onClick={() => navigate("/professores")} className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-primary-color text-white rounded-xl font-medium shadow-lg shadow-primary-color/20 hover:bg-green-600 active:scale-95 transition-all"
                        >Cadastrar Professor</button>
                    </div>
                </form>

            </div>
            
            <div className="w-full lg:w-72 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-2xl p-6 sm:p-8 rounded-3xl flex flex-col items-center">
                <h2 className="text-center text-sm uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-6 w-full pb-3 border-b border-gray-200 dark:border-zinc-700/50">Prévia da Foto</h2>
                <div className="w-48 h-48 rounded-full border-4 border-white dark:border-zinc-700 shadow-xl overflow-hidden flex justify-center items-center bg-gray-50 dark:bg-zinc-800/80">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Prévia" className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-16 h-16 text-gray-300 dark:text-zinc-600" strokeWidth={1.5} />
                    )}
                </div>
            </div>
            
        </div>
    );
}