//import { useLinkClickHandler } from "react-router-dom";
import Button from "../../../components/Buttons/button";
import { useNavigate } from "react-router-dom"


export default function Login() {
 const navigate = useNavigate()

 return (
  
  <div>
   <div className="bg-green-800 flex justify-between items-center ">
      <div className="flex justify-between items-center w-full">
        <div className="m-8 ml-15">
          <button className="text-white">
            button back
          </button>
        </div>
        <div className="items-end justify m-8 mr-15">
          <h1 className="text-white">Tennis Ball Academia <br /> logo</h1>
        </div>
      </div>
   </div>
   <div className="mt-20 ">
    <div className="flex flex-col justify-center items-center ">
      <h1 className="font-semibold text-4xl">
        Entre com sua conta
      </h1>
    </div>
    <form action=""
    //onSubmit={}
    className="bg-white flex flex-col justify-center items-center p-10 rounded-2xl">
      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center mt-10">
          <label htmlFor="" className="font-semibold text-lg items-start text-green-900">Insira seu Usuário ou Telefone</label>
          <input type="text"
          placeholder="Insira seu Usuário ou Telefone" 
          className="w-150 border-2 border-green-900 rounded-2xl p-3"/>
        </div>  
      
        <div className="mt-10">
          <div className="flex flex-col items-center">
            <label htmlFor="" className="font-semibold text-lg text-green-900 ">Insira sua Senha</label>
            <input type="password"
            placeholder="Insira sua Senha" 
            className="w-150 border-2 border-green-900 rounded-2xl p-3"/>
          </div>
          <div className="font-bold flex justify-end items-end mb-8 w-full">
                <p className="cursor-pointer pr-108 text-green-900" 
                //</div>onClick={() => navigate("/recuperar-senha")} 
                 >Esqueceu sua senha?</p>
              </div>
        </div>   
      </div>
      <Button
            type="button"
            onClick={() => navigate("/Cadastro")}
            children="Não possui uma conta? Cadastre-se agora!"
            className="font-medium text-black-smooth mt-8 cursor-pointer"
          />
      <div className="mt-12">
        <button type="submit" onClick={() => navigate("/Home")} className="font-semibold rounded-xl text-white text-xl bg-green-900 py-3 px-6 hover:bg-green-600">
          ACESSAR
        </button>
      </div>     
    </form>
   </div>
  </div> 
   
 );
}