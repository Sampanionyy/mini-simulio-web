import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { simulationService } from '../../services/simulationService';
import SimulationSummary from './SimulationSummary';
import SimulationDetails from './SimulationDetails';

const SimulationListModal = ({ clientId, onClose }) => {
    const [simulations, setSimulations] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!clientId) return;

        const fetchSimulations = async () => {
            setLoading(true);
            try {
                const response = await simulationService.getByClientId(clientId);
                setSimulations(response.data);
            } catch (error) {
                console.error('Erreur chargement simulations', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSimulations();
    }, [clientId]);

    const toggleDetails = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const exportPDF = (simulation) => {
        alert(`Export PDF simulation #${simulation.id} (fonction à implémenter)`);
    };

    if (!clientId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-gray-800 rounded-3xl p-8 mx-4 w-full max-w-4xl max-h-[90vh] overflow-auto border border-emerald-500 shadow-2xl shadow-emerald-600 animate-in fade-in duration-300 zoom-in-95">
                <button
                    onClick={onClose}
                    aria-label="Fermer"
                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                    <X size={24} className="text-gray-300" />
                </button>

                <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
                    Simulations précédentes
                </h2>

                {loading ? (
                    <p className="text-gray-400 text-center">Chargement des simulations...</p>
                ) : simulations.length === 0 ? (
                    <p className="text-gray-500 text-center">Aucune simulation trouvée pour ce client.</p>
                ) : (
                    <ul className="space-y-4">
                        {simulations.map(sim => (
                            <li key={sim.id} className="bg-gray-900 rounded-xl p-5 shadow-md border border-emerald-600">
                                <div
                                    className="flex justify-between items-center cursor-pointer select-none"
                                    onClick={() => toggleDetails(sim.id)}
                                >
                                    <SimulationSummary simulation={sim} />
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={e => { e.stopPropagation(); exportPDF(sim); }}
                                            className="p-1 rounded hover:bg-emerald-600 text-emerald-400"
                                            title="Exporter en PDF"
                                        >
                                            <FileText size={20} />
                                        </button>
                                        {expandedId === sim.id ? (
                                            <ChevronUp size={24} className="text-emerald-400" />
                                        ) : (
                                            <ChevronDown size={24} className="text-emerald-400" />
                                        )}
                                    </div>
                                </div>
                                {expandedId === sim.id && (
                                    <div className="mt-4 border-t border-emerald-600 pt-4">
                                        <SimulationDetails simulation={sim} />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SimulationListModal;
