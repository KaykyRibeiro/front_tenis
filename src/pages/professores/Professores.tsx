import { Search, UserPlus } from 'lucide-react';
import Sidebar from '../../components/navigation/Sidebar';
import clsx from 'clsx';

export default function Professores() {
    const professores = [
        { id: 1, nome: 'Professor A', disciplina: 'Matemática' },
        { id: 2, nome: 'Professor B', disciplina: 'Português' },
        { id: 3, nome: 'Professor C', disciplina: 'Ciências' },
    ];

    const handleAdicionarProfessor = () => {
        // Lógica para adicionar um novo professor
    }
    const handlePesquisar = () => {
        // Lógica para pesquisar professores
    }

    const totalProfessores = professores.length;
    return (
        <div className={clsx('flex flex-1 bg-gray-smooth dark:bg-black')}>
            <div className='flex flex-col ml-16 w-screen h-screen p-5'>
                <div className=' flex flex-row justify-between items-center w-full p-5 border-b border-gray-300 dark:border-gray-700'>
                    <div className='flex flex-row items-center gap-2'>
                        <h1 className='text-2xl font-light text-black-smooth dark:text-white'>Gestão de Professores</h1>
                        <p className='text-sm text-gray-500 dark:text-gray-500 bg-gray-300 dark:bg-gray-800 py-0.5 px-2 rounded-2xl'>{totalProfessores} professores registrados</p>
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
                                    id="disciplina">
                                    <option value="">Todos</option>
                                    <option value="matematica">Matemática</option>
                                    <option value="portugues">Português</option>
                                    <option value="ciencias">Ciências</option>
                                </select>
                            </div>

                        </div>

                        <div className='w-full mt-4'>
                            
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <Sidebar page="Professores" />
        </div>
    );
}