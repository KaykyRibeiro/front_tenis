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

    const handlePesquisar = () => {
        // Lógica para pesquisar professores
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
        <div className={clsx('flex flex-1 bg-gray-smooth dark:bg-black')}>
            <div className='flex flex-col ml-16 w-screen h-screen p-5'>
                <div className=' flex flex-row justify-between items-center w-full p-5 border-b border-gray-300 dark:border-gray-700'>
                    <div className='flex flex-row items-center gap-2'>
                        <h1 className='text-2xl font-light text-black-smooth dark:text-white'>Gestão de Professores</h1>
                        <p className='text-sm text-gray-500 dark:text-gray-500 bg-gray-300 dark:bg-gray-800 py-0.5 px-2 rounded-2xl'>{professores.length} professores registrados</p>
                    </div>
                    <div>
                        <button
                            onClick={handleAdicionarProfessor}
                            className='flex flex-row gap-2 px-4 py-2 bg-primary-color text-white rounded-2xl hover:bg-green-600 transition-colors duration-300'>
                            <UserPlus />
                            Adicionar Professor
                        </button>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 w-full mt-5'>
                    <div className='flex flex-col'>
                        <div className='flex flex-row justify-between '>
                            <div className='flex flex-row w-8/12'>
                                <input
                                    className='w-full bg-gray-300 dark:bg-zinc-800 text-black-smooth dark:text-white rounded-l-xl px-4 py-2 focus:outline-none'
                                    type="text"
                                    placeholder="Pesquisar professores..."
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />
                                <button
                                    className='px-4 py-2 bg-primary-color  text-white rounded-r-xl hover:bg-green-600 transition-colors duration-300'
                                    onClick={handlePesquisar}
                                >
                                    <Search />
                                </button>
                            </div>
                            <div className=''>
                                <select
                                    className='bg-gray-300 dark:bg-zinc-800 text-black-smooth dark:text-white rounded-sm px-4 py-2 focus:outline-none'
                                    name="disciplina"
                                    id="status"
                                    onChange={(e) => setFiltroStatus(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    <option value="ATIVO">Ativo</option>
                                    <option value="INATIVO">Inativo</option>
                                    <option value="BLOQUEADO">Bloqueado</option>
                                </select>
                            </div>

                        </div>

                        <div className='w-full mt-4'>
                            <TabsProfessores professores={professoresFiltrados} onSelect={setProfessorSelecionado} />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {perfil ? (
                            <CardPerfil {...perfil} />
                        ) : (
                            <p className="text-gray-500">Selecione um professor</p>
                        )}
                    </div>
                </div>
            </div>
            <Sidebar page="Professores" />
        </div>
    );
}