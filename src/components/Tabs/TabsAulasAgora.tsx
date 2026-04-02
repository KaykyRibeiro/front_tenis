import { MessageSquare } from 'lucide-react';

type User = {
    name: string;
    photoUrl: string;
    hours: string;
    whatsapp?: string; // número com código do país ex: "5511999999999"
};

interface UserTableProps {
    users: User[];
    onWhatsAppClick?: (whatsapp: string) => void;
}
export default function TabsAulasAgora({ users, onWhatsAppClick }: UserTableProps) {

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
    return (
        <div className="bg-white/80 dark:bg-black-smooth/80 backdrop-blur-md rounded-2xl shadow-xl shadow-black/5 border border-gray-100 dark:border-white/10 overflow-hidden flex flex-col h-full
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
            <div className="overflow-y-auto h-full p-2">
                <table className='min-w-full scroll-smooth table-auto border-separate border-spacing-y-1'>
                    <thead>
                        <tr>
                            <th className='px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400'>
                                Aluno
                            </th>
                            <th className='px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400'>
                                Horário
                            </th>
                            <th className='px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400'>
                                Contato
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-16 text-center text-gray-400 dark:text-gray-500 italic">Nenhuma aula agendada para agora.</td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={index} className="group bg-white dark:bg-zinc-900/40 hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors duration-200 rounded-xl overflow-hidden shadow-sm shadow-black/5 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700">
                                    <td className="whitespace-nowrap py-4 pl-6 pr-3 rounded-l-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-10 w-10 shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary-color/30 transition-all"
                                                    src={user.photoUrl}
                                                    alt={user.name}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150"; // fallback
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-primary-color dark:group-hover:text-primary-color transition-colors">
                                                    {user.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:block"></div>
                                            {user.hours}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm rounded-r-xl">
                                        {user.whatsapp ? (
                                            <button
                                                onClick={() => handleWhatsApp(user.whatsapp)}
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white dark:bg-green-500/10 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white transition-all active:scale-95"
                                                title={`Falar com ${user.name} no WhatsApp`}
                                            >
                                                <MessageSquare size={18} strokeWidth={2} />
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 italic text-xs">Indisponível</span>
                                        )}
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