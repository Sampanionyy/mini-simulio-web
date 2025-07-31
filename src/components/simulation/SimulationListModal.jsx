import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { simulationService } from '../../services/simulationService';
import SimulationSummary from './SimulationSummary';
import SimulationDetails from './SimulationDetails';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import SimulationPDFDocument from '../pdf/SimulationPDFDocument';

const SimulationListModal = ({ clientId, onClose }) => {
    const [simulations, setSimulations] = useState(null);
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

    const exportPDF = async (simulation) => {
        console.log({simulation})
        const doc = <SimulationPDFDocument simulation={simulation} />;
        const asPdf = pdf([]);
        asPdf.updateContainer(doc);

        const blob = await asPdf.toBlob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `simulation_${simulation.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (!clientId) return null;
    useEffect(() => {
        console.log({simulations})
    }, [simulations])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-gray-800 rounded-3xl p-8 mx-4 w-full max-w-4xl max-h-[90vh] overflow-auto border border-purple-300 shadow-2xl shadow-purple-400 animate-in fade-in duration-300 zoom-in-95">
                <button
                    onClick={onClose}
                    aria-label="Fermer"
                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                    <X size={24} className="text-gray-300" />
                </button>

                <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
                    Simulations précédentes
                </h2>

                {loading ? (
                    <p className="text-gray-400 text-center">Chargement des simulations...</p>
                ) : (!simulations) ? (
                    <p className="text-gray-500 text-center">Aucune simulation trouvée pour ce client.</p>
                ) : (
                    <ul className="space-y-4">
                        {simulations.map(sim => (
                            <li key={sim.id} className="bg-gray-900 rounded-xl p-5 shadow-md border border-purple-500">
                                <div
                                    className="flex justify-between items-center cursor-pointer select-none"
                                    onClick={() => toggleDetails(sim.id)}
                                >
                                    <SimulationSummary simulation={sim} />
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={e => { e.stopPropagation(); exportPDF(sim); }}
                                            className="p-1 rounded hover:bg-purple-500 text-purple-300"
                                            title="Exporter en PDF"
                                        >
                                            <FileText size={20} />
                                        </button>
                                        {expandedId === sim.id ? (
                                            <ChevronUp size={24} className="text-purple-400" />
                                        ) : (
                                            <ChevronDown size={24} className="text-purple-400" />
                                        )}
                                    </div>
                                </div>
                                {expandedId === sim.id && (
                                    <div className="mt-4 border-t border-purple-600 pt-4">
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
