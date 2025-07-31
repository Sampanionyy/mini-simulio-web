import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Calculator, User, X } from 'lucide-react'
import { simulationService } from '../services/simulationService'
import { clientService } from '../services/clientService'
import SimulationForm from '../components/simulation/SimulationForm'
import SimulationResults from '../components/simulation/SimulationResult'
import SimulationListModal from '../components/simulation/SimulationListModal'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const SimulationPage = () => {
    const query = useQuery()
    const clientId = query.get('clientId')

    const [selectedClient, setSelectedClient] = useState(null)
    const [simulationResult, setSimulationResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [loadingClient, setLoadingClient] = useState(false)
    const [showSimulationsModal, setShowSimulationsModal] = useState(false);

    useEffect(() => {
        if (!clientId) {
            setSelectedClient(null)
            return
        }

        const fetchClient = async () => {
            try {
                setLoadingClient(true)
                const response = await clientService.getById(clientId)
                setSelectedClient(response.data.data)
            } catch (error) {
                console.error('Erreur lors du chargement du client', error)
                setSelectedClient(null)
            } finally {
                setLoadingClient(false)
            }
        }

        fetchClient()
    }, [clientId])

    const handleSimulation = async (values, { setSubmitting }) => {
        setSubmitError('')
        setIsLoading(true)

        try {
            const simulationData = {
                ...values,
                client_id: selectedClient?.id || null
            }

            const response = await simulationService.store(simulationData)
            if (!response) throw new Error('Erreur lors de la simulation')

            const result = await response.data
            console.log({result})
            setSimulationResult(result)
        } catch (error) {
            console.error('Erreur:', error)
            setSubmitError('Une erreur est survenue lors du calcul. Veuillez réessayer.')
        } finally {
            setIsLoading(false)
            setSubmitting(false)
        }
    }

    const handleClearClient = () => {
        setSelectedClient(null)
        // Optionnel: supprimer clientId de l'URL si besoin
        // window.history.replaceState(null, '', '/simulation')
    }

    if (loadingClient) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white text-xl">
                Chargement du client...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {selectedClient && (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                            <button
                                onClick={() => setShowSimulationsModal(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 transition"
                            >
                                Voir simulations précédentes
                            </button>
                        </div>
                    )}

                    {showSimulationsModal && (
                        <SimulationListModal
                            clientId={selectedClient?.id}
                            onClose={() => setShowSimulationsModal(false)}
                        />
                    )}
                    {selectedClient && (
                        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/50 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-emerald-400 text-gray-900 p-3 rounded-full">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-emerald-300">
                                            Simulation pour : {selectedClient.name}
                                        </h3>
                                        <p className="text-gray-400">{selectedClient.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClearClient}
                                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105"
                                    title="Désélectionner le client"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Simulateur de Prêt Immobilier
                        </h1>
                        <p className="text-xl text-gray-300">
                            {selectedClient 
                                ? `Calculez la capacité d'emprunt de ${selectedClient.name}`
                                : "Calculez votre capacité d'emprunt en quelques clics"
                            }
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <SimulationForm
                            onSubmit={handleSimulation}
                            isLoading={isLoading}
                            submitError={submitError}
                            selectedClient={selectedClient}
                        />

                        <SimulationResults
                            simulationResult={simulationResult}
                            selectedClient={selectedClient}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimulationPage
