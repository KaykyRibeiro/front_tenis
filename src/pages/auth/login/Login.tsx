import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { VerifyLogin } from "../../../service/authService"

import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().nonempty("O email é obrigatório").email("Formato de email inválido"),
  senha: z.string().nonempty("A senha é obrigatória"),
})

type LoginFormData = z.infer<typeof loginSchema>;
export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [erro, setErro] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      senha: "",
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await VerifyLogin(data.email, data.senha);

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (redirect) {
        navigate(redirect);
      } else {
        navigate("/home");
      }

    } catch (err: any) {
      if (err.response?.status === 401) {
        setErro("Email ou senha inválidos. Tente novamente.");
      } else {
        console.log("Erro ao fazer login. Tente novamente.");
      }
    }
  }

  return (
    <div className="bg-[url(/public/banner-bg/bg-img-tenis.jpg)] bg-cover bg-center h-screen w-screen flex justify-center items-center">
      <div className="bg-black/20 backdrop-blur-sm p-2 md:p-10 rounded-2xl shadow-xl border border-white/10">
        <div className="flex justify-center items-center">
          <img src="/public/logo/logo-p-preto.png" alt="" className="w-40 md:w-100" />
        </div>
        {erro && <p className="text-red-500 text-2xl font-semibold text-center">{erro}</p>}
        <form action=""
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col justify-center items-center ">

          <div className="mt-5 md:mt-10 flex flex-col">
            <input
              type="email"
              placeholder="Insira seu Email"
              {...register("email")}
              className="w-80 md:w-150 border-b border-white text-white placeholder:text-white/70 font-light text-lg focus:outline-none" />
            <p className="absolute mt-8">
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
            </p>
          </div>

          <div className="mt-10 flex flex-col">
            <input type="password"
              placeholder="Insira sua Senha"
              {...register("senha")}
              className="w-80 md:w-150 border-b border-white  text-white placeholder:text-white/70 font-light text-lg focus:outline-none" />
            <p className="absolute mt-8">
              {errors.senha && <span className="text-red-500 text-sm mt-1">{errors.senha.message}</span>}
            </p>
          </div>
          <p
            className="cursor-pointer w-full items-end text-end text-gray-smooth/80 font-light text-sm hover:text-gray-smooth mb-15"
          >Esqueceu sua senha?</p>


          <div className="mt-12">
            <button type="submit" className="font-semibold rounded-xl text-white text-xl py-2 px-8 hover:bg-green-600 border-2 border-white transform hover:scale-105 transition duration-300 hover:border-green-600">
              ACESSAR
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}