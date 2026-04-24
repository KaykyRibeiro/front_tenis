import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usuarioService } from "../../service/usuarioService";

const alunoSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(100)
    .nonempty("O nome é obrigatório"),
  email: z.string().email().nonempty("O email é obrigatório"),
  telefone: z
    .string()
    .min(10, { message: "O telefone deve ter pelo menos 10 caracteres" })
    .max(15)
    .nonempty("O telefone é obrigatório"),
  ativo: z.string().nonempty("O status é obrigatório"),
  nivel: z.string().nonempty("O nível é obrigatório"),
  dataMatricula: z.string().nonempty("A data de matrícula é obrigatória"),
});

type AlunoFormData = z.infer<typeof alunoSchema>;
export default function FormNewAluno() {
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      ativo: "ATIVO",
      nivel: "Iniciante",
      dataMatricula: new Date().toISOString().split("T")[0],
    },
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

  const onSubmit = async (data: AlunoFormData) => {
    try {
      const payload = {
        usu_nome: data.nome,
        usu_email: data.email,
        usu_telefone: data.telefone,
        usu_status: data.ativo,
        id_tipo_usuario: 4,
        usu_senhaHash: "123456",
      };

      await usuarioService.createAluno(payload);

      console.log("Aluno cadastrado com sucesso!");
      navigate("/alunos");
    } catch (error) {
      console.error(error);
      setErro("Erro ao cadastrar aluno");
    }
  };
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-5xl justify-center z-10 p-4">
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-2xl p-8 sm:p-10 rounded-3xl w-full max-w-xl">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Novo Aluno
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
            Insira as informações do aluno para cadastrá-lo na plataforma.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Nome Completo
            </label>
            <input
              {...register("nome")}
              type="text"
              id="nome"
              className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm"
              placeholder="Ex: João Silva"
            />
            {errors.nome && (
              <span className="text-xs text-red-500 mt-1 font-medium block">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="fotoUrl"
              className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Foto de Perfil
            </label>
            <input
              type="file"
              id="fotoUrl"
              accept="image/*"
              onChange={handleImagePreview}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary-color/10 file:text-primary-color hover:file:bg-primary-color/20 transition-all border border-gray-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900/80 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="exemplo@email.com"
                className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm"
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 font-medium block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Telefone
              </label>
              <input
                {...register("telefone")}
                type="tel"
                id="telefone"
                placeholder="(11) 99999-9999"
                className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm"
              />
              {errors.telefone && (
                <span className="text-xs text-red-500 mt-1 font-medium block">
                  {errors.telefone.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="ativo"
                className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Status
              </label>
              <select
                {...register("ativo")}
                id="ativo"
                className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm"
              >
                <option value="ATIVO">ATIVO</option>
                <option value="INATIVO">INATIVO</option>
              </select>
              {errors.ativo && (
                <span className="text-xs text-red-500 mt-1 font-medium block">
                  {errors.ativo.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="nivel"
                className="block text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Nível
              </label>
              <select
                {...register("nivel")}
                id="nivel"
                className="block w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all shadow-sm"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
              {errors.nivel && (
                <span className="text-xs text-red-500 mt-1 font-medium block">
                  {errors.nivel.message}
                </span>
              )}
            </div>
          </div>

          {erro && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-red-700 dark:text-red-300 text-sm font-medium">
              {erro}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/alunos")}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-all active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary-color text-white font-medium rounded-xl hover:bg-primary-color/90 transition-all active:scale-95 shadow-lg shadow-primary-color/20"
            >
              Cadastrar Aluno
            </button>
          </div>
        </form>
      </div>
      {imagePreview && (
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 shadow-2xl p-6 rounded-3xl w-full text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Preview da Foto
          </h3>
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
