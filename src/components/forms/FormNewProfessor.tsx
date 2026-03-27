import { zodResolver } from "@hookform/resolvers/zod";
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
        <div className="bg-white/60 backdrop-blur-sm p-10 rounded-2xl shadow-md w-full max-w-md">
            <h1 className="text-2xl font-light mb-4 text-center">Cadastro de Professor</h1>
            <form onSubmit={handleSubmit(confirmarSenhaValidation)} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-primary-color">Nome</label>
                    <input
                        {...register("nome")}
                        type="text"
                        id="nome"
                        className="mt-1 block w-full text-black placeholder:text-black/70 font-light text-lg p-2 rounded-md focus:outline-none border-gray-400 shadow-sm bg-white/10"
                        placeholder="Insira seu nome"
                    />
                    {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
                </div>
                <div>
                    <label
                        htmlFor="fotoUrl"
                        className="block text-sm font-medium text-primary-color">Foto</label>
                    <input
                        type="file"
                        id="fotoUrl"
                        className="mt-1 block w-full text-black placeholder:text-black/70 font-light text-lg p-2 rounded-md focus:outline-none border-gray-400 shadow-sm bg-white/10" />

                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-primary-color">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="mt-1 block w-full text-black placeholder:text-black/70 font-light text-lg p-2 rounded-md focus:outline-none border-gray-400 shadow-sm bg-white/10" />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div>
                    <label
                        htmlFor="telefone"
                        className="block text-sm font-medium text-primary-color">Telefone</label>
                    <input
                        {...register("telefone")}
                        type="tel" id="telefone"
                        className="mt-1 block w-full text-black placeholder:text-black/70 font-light text-lg p-2 rounded-md focus:outline-none border-gray-400 shadow-sm bg-white/10" />
                    {errors.telefone && <span className="text-red-500">{errors.telefone.message}</span>}
                </div>
                <div>
                    <label
                        htmlFor="senha"
                        className="block text-sm font-medium text-primary-color">Senha</label>
                    <input
                        {...register("senha")}
                        type="password"
                        id="senha"
                        className="mt-1 block w-full text-black placeholder:text-black/70 font-light text-lg p-2 rounded-md focus:outline-none border-gray-400 shadow-sm bg-white/10" />
                    {errors.senha && <span className="text-red-500">{errors.senha.message}</span>}
                </div>
                <div>
                    <label
                        htmlFor="confirmarSenha"
                        className="block text-sm font-medium text-primary-color">Confirmar Senha</label>
                    <input
                        {...register("confirmarSenha")}
                        type="password" id="confirmarSenha"
                        className="mt-1 block w-full text-black placeholder:text-black/70 font-light text-lg p-2 rounded-md focus:outline-none border-gray-400 shadow-sm bg-white/10" />
                    {errors.confirmarSenha && <span className="text-red-500">{errors.confirmarSenha.message}</span>}
                    {erro && <span className="text-red-500">{erro}</span>}
                </div>
                
                <div className="flex justify-between space-x-2">
                    <button type="button" onClick={() => navigate("/professores")} className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded">Cancelar</button>
                    <button 
                        type="submit" 
                        className="border border-primary-color hover:border-green-600 hover:bg-green-600 text-primary-color hover:text-white hover:shadow-md hover:shadow-green-600 hover:scale-105 transition duration-300 font-semibold py-2 px-4 rounded"
                        >Cadastrar</button>
                </div>

            </form>
        </div>
    );
}