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
        <div className="bg-white dark:bg-black-smooth h-10/12 rounded-xl shadow-xl overflow-y-auto 
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
                        <th className='px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300'>
                            Aluno
                        </th>
                        <th className='px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300'>
                            Horário
                        </th>
                        <th className='px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300'>
                            Contato
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-16 text-center text-black-smooth dark:text-gray-500 italic">Nenhuma aula agendada</td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td className="whitespace-nowrap py-4 pl-6 pr-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative h-11 w-11 shrink-0">
                                            <img
                                                className="h-11 w-11 rounded-full object-cover ring-1 ring-zinc-700/70 transition-transform group-hover:scale-105"
                                                src={user.photoUrl}
                                                alt={user.name}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150"; // fallback
                                                }}
                                            />
                                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-black dark:text-gray-300 group-hover:text-white transition-colors">
                                                {user.name}
                                            </div>

                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.hours}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    {user.whatsapp ? (
                                        <button
                                            onClick={() => handleWhatsApp(user.whatsapp)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-green-600/20 px-3.5 py-2 text-green-500 hover:bg-green-600/30 hover:text-green-300 transition-all active:scale-95"
                                            title={`Falar com ${user.name} no WhatsApp`}
                                        >
                                            <MessageSquare size={18} className="fill-current" />
                                            <span className="font-medium">WhatsApp</span>
                                        </button>
                                    ) : (
                                        <span className="text-zinc-600 italic text-sm">Sem WhatsApp</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}