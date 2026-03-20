
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
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Status</th>
                        <th>Contato</th>
                    </tr>
                </thead>
                <tbody>
                    {professores.length === 0 ? (
                        <tr>
                            <td>Nenhum professor encontrado</td>
                        </tr>
                    ) : (
                        professores.map((professor) => (
                            <tr key={professor.id}>
                                <td>
                                    <img src={professor.photoUrl} alt={professor.name} />
                                </td>
                                <td>{professor.name}</td>
                                <td>{professor.status}</td>
                                <td>
                                    <button onClick={() => handleWhatsApp(professor.whatsapp)}>WhatsApp</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}