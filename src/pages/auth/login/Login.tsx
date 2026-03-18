//import { useLinkClickHandler } from "react-router-dom";
//import Button from "../../../components/Buttons/button";
import { useNavigate } from "react-router-dom"


export default function Login() {
  const navigate = useNavigate()

  return (

    <div className="bg-[url(/public/banner-bg/bg-img-tenis.jpg)] bg-cover bg-center h-screen w-screen flex justify-center items-center">
      <div className="bg-black/20 backdrop-blur-sm p-2 md:p-10 rounded-2xl shadow-xl border border-white/10">
        <div className="flex justify-center items-center">
          <img src="/public/logo/logo-p-preto.png" alt="" className="w-40 md:w-100" />
        </div>
        <form action=""
          //onSubmit={}
          className=" flex flex-col justify-center items-center ">

          <div className="mt-5 md:mt-10">
            <input type="text"
              placeholder="Insira seu Usuário ou Telefone"
              className="w-80 md:w-150 border-b border-white text-white placeholder:text-white/70 font-light text-lg focus:outline-none" />
          </div>

          <div className="mt-10">
            <input type="password"
              placeholder="Insira sua Senha"
              className="w-80 md:w-150 border-b border-white  text-white placeholder:text-white/70 font-light text-lg focus:outline-none" />
          </div>
          <p
            className="cursor-pointer w-full items-end text-end text-gray-smooth/80 font-light text-sm hover:text-gray-smooth mb-15"
          //</div>onClick={() => navigate("/recuperar-senha")} 
          >Esqueceu sua senha?</p>


          {/*
          <div className="text-white">
            <Button
              type="button"
              onClick={() => navigate("/Cadastro")}
              children="Não possui uma conta? Cadastre-se agora!"
              className="font-medium text-white cursor-pointer"
            />
          </div>
          */}


          <div className="mt-12">
            <button type="submit" onClick={() => navigate("/Home")} className="font-semibold rounded-xl text-white text-xl py-2 px-8 hover:bg-green-600 border-2 border-white transform hover:scale-105 transition duration-300 hover:border-green-600">
              ACESSAR
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}