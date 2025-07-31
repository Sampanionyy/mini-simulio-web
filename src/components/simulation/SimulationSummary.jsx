import { format } from 'date-fns';

const SimulationSummary = ({ simulation }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <span className="text-gray-300 font-semibold text-lg">
                Mensualité : <span className="text-emerald-400">{simulation.mensualite} €</span>
            </span>
            <span className="text-gray-400 text-sm mt-1 sm:mt-0">
                Créée le{' '}
                <time dateTime={simulation.created_at}>
                    {format(new Date(simulation.created_at), 'dd/MM/yyyy')}
                </time>
            </span>
        </div>
    );
};

export default SimulationSummary;
