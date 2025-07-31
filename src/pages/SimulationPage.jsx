import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { simulationService } from '../services/simulationService';
import SimulationForm from '../components/SimulationForm';
import SimulationResults from '../components/SimulationResult';

const SimulationPage = () => {
    const [simulationResult, setSimulationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSimulation = async (values, { setSubmitting }) => {
        setSubmitError('');
        setIsLoading(true);

        try {
            const response = await simulationService.store(values);
            console.log({ response }, response.data);

            if (!response) throw new Error('Erreur lors de la simulation');

            const result = await response.data;
            setSimulationResult(result);
        } catch (error) {
            console.error('Erreur:', error);
            setSubmitError('Une erreur est survenue lors du calcul. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Simulateur de Prêt Immobilier
                        </h1>
                        <p className="text-xl text-gray-300">
                            Calculez votre capacité d'emprunt en quelques clics
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <SimulationForm
                            onSubmit={handleSimulation}
                            isLoading={isLoading}
                            submitError={submitError}
                        />

						<SimulationResults
							simulationResult={simulationResult}
						/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulationPage;