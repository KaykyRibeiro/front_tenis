import Navbar from "../../../components/Navbar"
import { useNavigate } from "react-router-dom"
import { Stepper } from "../../../components/steps/stepper"


export default function Register2() {
   const navigate = useNavigate()

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className="mt-12 mr-100 ml-100">
        <div className="justify-center items-center flex">
          <h2 className="font-semibold text-lg text-center">
            Insira algumas informações complementares para configurarmos tudo
          </h2>
        </div>
        <div className="mt-20">
          <form action="">
            <div className="flex flex-col items-center">
              <label htmlFor="" className="font-semibold text-lg text-green-900 flex flex-col justify-start items-start">Insira sua Data de Nascimento</label>
              <input type="date"
              placeholder="Insira sua Data de Nascimento" 
              className="w-150 border-2 border-green-900 rounded-2xl p-3"/>
            </div>
            <div className="flex flex-col items-center mt-12">
              <label htmlFor="" className="font-semibold text-lg text-green-900 flex flex-col justify-start items-start">Insira seu Gênero</label>
              <input type="text"
              placeholder="Insira seu Gênero" 
              className="w-150 border-2 border-green-900 rounded-2xl p-3"/>
            </div>
            <div className="mt-12 justify-center items-center flex flex-col">
              <button type="submit" onClick={() => navigate("/cadastro4")} className="font-semibold rounded-xl text-white text-xl bg-green-900 py-3 px-6 hover:bg-green-600">
                AVANÇAR
              </button>
            </div>     
          </form>
          <div className="mt-12 mb-12">
            <Stepper activeStep={3} />
          </div>
        </div>
      </div>
    </div>
  )
}
