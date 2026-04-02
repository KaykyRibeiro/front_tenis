import { Search, UserPlus } from 'lucide-react';
import Sidebar from '../../components/navigation/Sidebar';
import clsx from 'clsx';
import TabsProfessores from '../../components/Tabs/TabsProfessores';
import CardPerfil from '../../components/cads/CardPerfil';
import { useNavigate } from 'react-router-dom';
import { professoresService } from '../../service/professoresService';
import { useEffect, useState } from 'react';


export default function Professores() {
    const navigate = useNavigate();

    // const perfilProfessor = {
    //     nome: "Professor A",
    //     status: "Em Aula",
    //     fotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    //     aulas: ["10:00", "11:00", "13:00", "14:00"],
    //     disponibilidade: ["17:00", "18:00", "19:00"],
    // };

    const handleAdicionarProfessor = () => {
        navigate('/professores/cadastro');
    }



    const [professores, setProfessores] = useState<any[]>([]);
    const [professorSelecionado, setProfessorSelecionado] = useState<any>(null);
    const [perfil, setPerfil] = useState<any>(null);
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("");

    const professoresFiltrados = professores.filter((professor) => {
        const nomeNormalizado = professor.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const buscaNormalizada = busca
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const matchNome = nomeNormalizado.includes(buscaNormalizada);
        const matchStatus = !filtroStatus || professor.status === filtroStatus;

        return matchNome && matchStatus;
    });

    useEffect(() => {
        async function fetchProfessores() {
            try {
                const data = await professoresService.getProfessores();
                console.log(data);

                const formatted = data.map((professores: any) => ({
                    id: professores.usu_id,
                    photoUrl: professores.usu_foto || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150",
                    name: professores.usu_nome,
                    status: professores.usu_status,
                    whatsapp: professores.usu_telefone,
                }));

                setProfessores(formatted);
            } catch (error) {
                console.error("Erro ao buscar professores:", error);
            }
        }

        fetchProfessores();
    }, [])

    useEffect(() => {
        async function fetchPerfil() {
            if (!professorSelecionado) return;

            try {
                const data = await professoresService.getProfessorById(professorSelecionado.id);
                setPerfil(data);
            } catch (error) {
                console.error("Erro ao buscar perfil:", error);
            }
        }

        fetchPerfil();
    }, [professorSelecionado]);

    return (
        <div className={clsx('min-h-screen bg-gray-smooth dark:bg-black-smooth font-sans text-gray-900 dark:text-gray-100 flex overflow-hidden')}>
            

            <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden transition-all duration-300">
                <header className='w-full flex md:flex-row flex-col justify-between px-6 lg:px-10 py-4   gap-4 md:items-center'>
                    <div className='flex flex-row items-center gap-4'>
                        <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight'>Gestão de Professores</h1>
                        <span className='text-xs font-semibold text-primary-color bg-primary-color/10 px-3 py-1 rounded-full uppercase tracking-wider'>{professores.length} registros</span>
                    </div>
                    <div>
                        <button
                            onClick={handleAdicionarProfessor}
                            className='flex items-center gap-2 px-5 py-2.5 bg-primary-color text-white font-medium rounded-xl hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-primary-color/20'>
                            <UserPlus size={18} />
                            Adicionar Professor
                        </button>
                    </div>
                </header>

                <main className='flex-1 overflow-y-auto w-full p-6 lg:p-10'>
                    <div className="max-w-[1600px] mx-auto h-full flex flex-col">
                        <div className='grid grid-cols-1 xl:grid-cols-12 gap-8 2xl:gap-12 flex-1'>
                            <div className='xl:col-span-8 flex flex-col gap-6 h-full'>
                                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                                    <div className='flex flex-row flex-1 w-full relative shadow-sm rounded-xl'>
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            className='w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-color/50 transition-all'
                                            type="text"
                                            placeholder="Pesquisar professores..."
                                            value={busca}
                                            onChange={(e) => setBusca(e.target.value)}
                                        />
                                    </div>
                                    <div className='sm:w-48'>
                                        <select
                                            className='w-full bg-white dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-color/50 cursor-pointer shadow-sm transition-all'
                                            defaultValue=""
                                            onChange={(e) => setFiltroStatus(e.target.value)}
                                        >
                                            <option value="">Todos os Status</option>
                                            <option value="ATIVO">Ativo</option>
                                            <option value="INATIVO">Inativo</option>
                                            <option value="BLOQUEADO">Bloqueado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex-1 border border-transparent'>
                                    <TabsProfessores professores={professoresFiltrados} onSelect={setProfessorSelecionado} />
                                </div>
                            </div>
                            
                            <div className='xl:col-span-4 flex justify-center items-start w-full max-w-sm mx-auto xl:max-w-full'>
                                {perfil ? (
                                    <CardPerfil {...perfil} />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 p-8 w-full bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300 dark:border-zinc-700">
                                        <div className="p-4 bg-gray-100 dark:bg-zinc-800/80 rounded-full mb-4">
                                             <UserPlus className="text-gray-400 dark:text-zinc-500" size={32} />
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-center font-medium">Selecione um professor na lista para ver os detalhes do perfil</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Sidebar page="Professores" />
        </div>
    );
}