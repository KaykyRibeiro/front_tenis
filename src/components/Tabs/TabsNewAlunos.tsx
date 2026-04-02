// components/UserTable.tsx
import { MessageSquare } from 'lucide-react'; // ou use heroicons, phosphor, etc

type User = {
  id: string | number;
  name: string;
  photoUrl: string;
  whatsapp?: string; // número com código do país ex: "5511999999999"
};

interface UserTableProps {
  users: User[];
  onWhatsAppClick?: (whatsapp: string) => void;
}

export default function TabsNewAlunos({ users, onWhatsAppClick }: UserTableProps) {
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
    <div className="w-full bg-white/80 dark:bg-black-smooth/80 backdrop-blur-md rounded-2xl shadow-xl shadow-black/5 border border-gray-100 dark:border-white/10 p-2 overflow-hidden flex flex-col
        /* Custom scrollbar */
        [&::-webkit-scrollbar]:w-2 
        dark:[&::-webkit-scrollbar-track]:bg-gray-800/30 
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
        [&::-webkit-scrollbar-track]:bg-gray-50 
        [&::-webkit-scrollbar-thumb]:bg-gray-300 
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb:hover]:bg-gray-400
    ">
      <div className="overflow-x-auto overflow-y-auto w-full h-full">
        <table className="min-w-full border-separate border-spacing-y-1">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Novos Alunos
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
                Contato
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-16 text-center text-gray-400 dark:text-gray-500 italic">
                  Nenhum usuário encontrado
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="group bg-white dark:bg-zinc-900/40 hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors duration-200 rounded-xl overflow-hidden shadow-sm shadow-black/5 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700"
                >
                  {/* Coluna Foto + Nome */}
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
                        <div className="text-xs text-gray-400 font-medium">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Coluna WhatsApp */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm rounded-r-xl">
                    {user.whatsapp ? (
                      <button
                        onClick={() => handleWhatsApp(user.whatsapp)}
                        className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:py-2 gap-2 rounded-full sm:rounded-lg bg-green-50 text-green-600 hover:bg-green-500 hover:text-white dark:bg-green-500/10 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white transition-all active:scale-95"
                        title={`Falar com ${user.name} no WhatsApp`}
                      >
                        <MessageSquare size={18} strokeWidth={2} />
                        <span className="font-medium hidden sm:block">WhatsApp</span>
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