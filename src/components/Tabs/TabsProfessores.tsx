import { MessageSquare, SquareArrowOutUpRight } from "lucide-react";

type PropsProfessores = {
    id: number;
    name: string;
    photoUrl: string;
    status: string;
    whatsapp?: string;
}

interface TabsProfessoresProps {
    professores: PropsProfessores[];
    onWhatsAppClick?: (whatsapp: string) => void;
    onSelect: (professor: any) => void;
}
export default function TabsProfessores({ professores, onWhatsAppClick, onSelect }: TabsProfessoresProps) {
    const handleWhatsApp = (whatsapp?: string) => {
        if (!whatsapp) return;

        const cleanNumber = whatsapp.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${cleanNumber}`;

        if (onWhatsAppClick) {
            onWhatsAppClick(cleanNumber);
        } else {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }
    };
    // function handleEditarProfessor(id: number): void {
    //     throw new Error("Function not implemented.");
    // }

    return (
        <div className="w-full bg-white/80 dark:bg-black-smooth/80 backdrop-blur-md rounded-2xl shadow-xl shadow-black/5 border border-gray-100 dark:border-zinc-800/50 p-2 overflow-hidden flex flex-col h-full
            /* Largura da barra */
            [&::-webkit-scrollbar]:w-2 
            /* Cor do trilho (fundo) */
            dark:[&::-webkit-scrollbar-track]:bg-gray-800/30 
            /* Cor da alça (o que arrasta) */ dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
            [&::-webkit-scrollbar-track]:bg-gray-50 
            /* Cor da alça (o que arrasta) */
            [&::-webkit-scrollbar-thumb]:bg-gray-300 
            /* Bordas arredondadas na alça */
            [&::-webkit-scrollbar-thumb]:rounded-full
            /* Cor da alça ao passar o mouse */
            [&::-webkit-scrollbar-thumb:hover]:bg-gray-400
        ">
            <div className="overflow-x-auto overflow-y-auto w-full h-full">
                <table className='min-w-full scroll-smooth table-auto border-separate border-spacing-y-1'>
                    <thead>
                        <tr>
                            <th className='px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400'>Foto</th>
                            <th className='px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400'>Nome</th>
                            <th className='px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400'>Status</th>
                            <th className='px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400'>Contato</th>
                            <th className='px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400'>Perfil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professores.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-16 text-center text-gray-400 dark:text-gray-500 italic">Nenhum professor encontrado</td>
                            </tr>
                        ) : (
                            professores.map((professor) => (
                                <tr key={professor.id} className="group bg-white dark:bg-zinc-900/40 hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors duration-200 rounded-xl overflow-hidden shadow-sm shadow-black/5 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700">
                                    <td className="whitespace-nowrap py-4 pl-6 pr-3 rounded-l-xl">
                                        <div className="relative h-10 w-10 shrink-0">
                                            <img 
                                            src={professor.photoUrl} 
                                            alt={professor.name} 
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary-color/30 transition-all"
                                            />
                                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                                        </div>
                                    </td>
                                    <td className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-primary-color dark:group-hover:text-primary-color transition-colors" >{professor.name}</td>
                                    <td className="font-medium text-gray-600 dark:text-gray-300 transition-colors">
                                        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${professor.status === 'ATIVO' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                                            {professor.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        {professor.whatsapp ? (
                                            <button
                                                onClick={() => handleWhatsApp(professor.whatsapp)}
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white dark:bg-green-500/10 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white transition-all active:scale-95"
                                                title={`Falar com ${professor.name} no WhatsApp`}
                                            >
                                                <MessageSquare size={18} strokeWidth={2} />
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 italic text-xs">Indisponível</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm rounded-r-xl">
                                        <button
                                            className="inline-flex items-center justify-center w-9 h-9 gap-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white dark:bg-blue-500/10 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white transition-all active:scale-95"
                                            title={`Editar ${professor.name}`}
                                            onClick={() => onSelect(professor)}
                                        >
                                            <SquareArrowOutUpRight size={18} strokeWidth={2} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}