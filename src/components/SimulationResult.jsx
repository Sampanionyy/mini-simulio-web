import { Calculator, TrendingUp, PieChart } from 'lucide-react';
import ResultCard from './ResultCard';
import ResultDetail from './ResultDetail';

const SimulationResults = ({ simulationResult }) => {
    if (!simulationResult) {
        return (
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
                <Calculator className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Simulation en attente</h3>
                <p className="text-gray-400">
                    Remplissez le formulaire et cliquez sur "Calculer" pour voir vos résultats
                </p>
            </div>
        );
    }

    const formatCurrency = (value) => 
        parseFloat(value || 0).toLocaleString('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    const formatNumber = (value) => 
        parseFloat(value || 0).toLocaleString('fr-FR');

    const detailsData = [
        { label: 'Prix du bien :', value: `${formatNumber(simulationResult.prix_bien)} €` },
        { label: 'Frais de notaire :', value: `${formatNumber(simulationResult.frais_notaire)} €` },
        { label: 'Garantie bancaire :', value: `${formatNumber(simulationResult.garantie_bancaire)} €` },
        { label: 'Travaux :', value: `${formatNumber(simulationResult.travaux)} €` },
        { label: 'Frais d\'agence :', value: `${formatNumber(simulationResult.frais_agence)} €` },
        { label: 'Total à financer :', value: `${formatNumber(simulationResult.total_financer)} €`, separator: true },
        { label: 'Revenu minimum conseillé :', value: `${simulationResult.salaire_minimum?.toLocaleString('fr-FR')} € / mois`, separator: true }
    ];

    return (
        <div className="space-y-6">
            <ResultCard
                icon={TrendingUp}
                title="Mensualité"
                value={`${formatCurrency(simulationResult.mensualite)} €`}
                subtitle="par mois"
                className="bg-gradient-to-br from-purple-600 to-purple-700"
                textColor="text-white"
            />

            <div className="bg-gray-800 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                    <PieChart className="w-6 h-6 text-green-400 mr-3" />
                    <h3 className="text-xl font-bold text-white">Détails du financement</h3>
                </div>

                <div className="space-y-4">
                    {detailsData.map((detail, index) => (
                        <ResultDetail
                            key={index}
                            label={detail.label}
                            value={detail.value}
                            separator={detail.separator}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SimulationResults;