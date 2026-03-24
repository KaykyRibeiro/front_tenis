import { MessageSquare, SquareArrowOutUpRight, SquarePen } from "lucide-react";

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
}
export default function TabsProfessores({ professores, onWhatsAppClick }: TabsProfessoresProps) {
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
    function handleEditarProfessor(id: number): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="bg-white dark:bg-black-smooth max-h-120  rounded-xl shadow-xl overflow-y-auto 
            /* Largura da barra */
            [&::-webkit-scrollbar]:w-2 
            /* Cor do trilho (fundo) */
            dark:[&::-webkit-scrollbar-track]:bg-gray-700/20 
            /* Cor da alça (o que arrasta) */ dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
            [&::-webkit-scrollbar-track]:bg-gray-100 
            /* Cor da alça (o que arrasta) */
            [&::-webkit-scrollbar-thumb]:bg-gray-400 
            /* Bordas arredondadas na alça */
            [&::-webkit-scrollbar-thumb]:rounded-full
            /* Cor da alça ao passar o mouse */
            [&::-webkit-scrollbar-thumb:hover]:bg-gray-500

        ">
            <table className='min-w-full scroll-smooth table-auto'>
                <thead>
                    <tr>
                        <th className='px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300'>Foto</th>
                        <th className='px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300'>Nome</th>
                        <th className='px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300'>Status</th>
                        <th className='px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300'>Contato</th>
                        <th className='px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300'>Ver mais</th>
                    </tr>
                </thead>
                <tbody>
                    {professores.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-16 text-center text-black-smooth dark:text-gray-500 italic">Nenhum professor encontrado</td>
                        </tr>
                    ) : (
                        professores.map((professor) => (
                            <tr key={professor.id}>
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 rounded-2xl">
                                    <img 
                                    src={professor.photoUrl} 
                                    alt={professor.name} 
                                    className="h-12 w-12 rounded-full object-cover ring-1 ring-zinc-700/70 transition-transform group-hover:scale-105"
                                    />
                                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
                                </td>
                                <td className="font-medium text-black dark:text-gray-300 group-hover:text-white transition-colors" >{professor.name}</td>
                                <td className="font-medium text-black dark:text-gray-300 group-hover:text-white transition-colors">{professor.status}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    {professor.whatsapp ? (
                                        <button
                                            onClick={() => handleWhatsApp(professor.whatsapp)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-green-600/20 px-3.5 py-2 text-green-500 hover:bg-green-600/30 hover:text-green-300 transition-all active:scale-95"
                                            title={`Falar com ${professor.name} no WhatsApp`}
                                        >
                                            <MessageSquare size={18} className="fill-current" />
                                            <span className="font-medium">WhatsApp</span>
                                        </button>
                                    ) : (
                                        <span className="text-zinc-600 italic text-sm">Sem WhatsApp</span>
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    <button
                                        onClick={() => handleEditarProfessor(professor.id)}
                                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600/20 px-3.5 py-2 text-blue-500 hover:bg-blue-600/30 hover:text-blue-300 transition-all active:scale-95"
                                        title={`Editar ${professor.name}`}
                                    >
                                        <SquareArrowOutUpRight size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}