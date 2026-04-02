import FormNewAluno from "../../components/forms/FormNewAluno";

export default function AluCadastro() {
    return (
        <div className="relative flex flex-1 min-h-screen w-screen justify-center items-center bg-[url(/public/banner-bg/bg-img-tenis.jpg)] bg-cover bg-center bg-no-repeat font-sans font-light">
                {/* Overlay escuro para dar contraste ao painel de vidro */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]" />
                
                <div className="relative z-10 w-full flex justify-center p-4">
                    <FormNewAluno/>
                </div>
           </div>
    );
}