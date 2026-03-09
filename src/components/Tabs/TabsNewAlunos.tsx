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
    <div className="overflow-x-auto rounded-xl md:w-8/12 2xl:w-6/12 bg-white dark:bg-black-smooth shadow-2xl backdrop-blur-sm">
      <table className="min-w-full ">
        <thead>
          <tr className="">
            <th scope="col" className="px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300">
              Novos Alunos
            </th>
            <th scope="col" className="px-6 py-4 text-left text-md font-semibold text-black dark:text-gray-300">
              Contato
            </th>
          </tr>
        </thead>

        <tbody className="">
          {users.length === 0 ? (
            <tr>
              <td colSpan={2} className="px-6 py-16 text-center text-black-smooth dark:text-gray-500 italic">
                Nenhum usuário encontrado
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="group hover:bg-zinc-800/40 transition-colors duration-150"
              >
                {/* Coluna Foto + Nome */}
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
                      <div className="text-xs text-zinc-500">
                        ID: {user.id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Coluna WhatsApp */}
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