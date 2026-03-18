import Sidebar from '../../components/navigation/Sidebar';
import clsx from 'clsx';

export default function Professores() {
    return (
        <div className={clsx('flex flex-1 flex-col h-screen bg-gray-smooth dark:bg-black')}>
            <div>

            </div>
            <Sidebar page="Professores"/>
        </div>
    );
}