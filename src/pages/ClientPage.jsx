import { useEffect, useState } from 'react'
import { Plus, Users } from 'lucide-react'
import { clientService } from '../services/clientService'
import ClientCard from '../components/client/ClientCard'
import ClientFormModal from '../components/client/ClientFormModal'
import DeleteModal from '../components/client/DeleteModal'

const ClientPage = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedClient, setSelectedClient] = useState(null)
    const [actionLoading, setActionLoading] = useState(false)

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        try {
            setLoading(true)
            const response = await clientService.getAll()
            setClients(response.data.data)
        } catch (error) {
            console.error('Erreur lors du chargement des clients', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddClient = () => {
        setSelectedClient(null)
        setIsFormModalOpen(true)
    }

    const handleEditClient = (client) => {
        setSelectedClient(client)
        setIsFormModalOpen(true)
    }

    const handleDeleteClient = (client) => {
        setSelectedClient(client)
        setIsDeleteModalOpen(true)
    }

    const handleFormSubmit = async (values, clientId = null) => {
        try {
            setActionLoading(true)
            
            if (clientId) {
                // Modification
                await clientService.update(clientId, values)
            } else {
                // Ajout
                await clientService.create(values)
            }
            
            await fetchClients()
            setIsFormModalOpen(false)
            setSelectedClient(null)
        } catch (error) {
            console.error('Erreur lors de la sauvegarde', error)
        } finally {
            setActionLoading(false)
        }
    }

    const handleConfirmDelete = async () => {
        if (!selectedClient) return
        
        try {
            setActionLoading(true)
            await clientService.delete(selectedClient.id)
            await fetchClients()
            setIsDeleteModalOpen(false)
            setSelectedClient(null)
        } catch (error) {
            console.error('Erreur lors de la suppression', error)
        } finally {
            setActionLoading(false)
        }
    }

    const handleCloseModals = () => {
        if (actionLoading) return
        
        setIsFormModalOpen(false)
        setIsDeleteModalOpen(false)
        setSelectedClient(null)
    }

    return (
        <div className="p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30">
                        <Users size={32} className="text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Gestion des clients
                        </h1>
                        <p className="text-gray-400">
                            {clients.length} client{clients.length !== 1 ? 's' : ''} enregistré{clients.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                
                <button
                    onClick={handleAddClient}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                    <Plus size={20} />
                    Nouveau client
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-blue-400 text-xl">Chargement des clients...</p>
                    </div>
                </div>
            ) : clients.length === 0 ? (
                <div className="text-center py-20">
                    <div className="p-4 rounded-full bg-gray-800/50 border border-gray-700 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <Users size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                        Aucun client trouvé
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Commencez par ajouter votre premier client
                    </p>
                    <button
                        onClick={handleAddClient}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
                    >
                        <Plus size={18} />
                        Ajouter un client
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map(client => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            onEdit={handleEditClient}
                            onDelete={handleDeleteClient}
                        />
                    ))}
                </div>
            )}

            <ClientFormModal
                isOpen={isFormModalOpen}
                onClose={handleCloseModals}
                onSubmit={handleFormSubmit}
                client={selectedClient}
                loading={actionLoading}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseModals}
                onConfirm={handleConfirmDelete}
                clientName={selectedClient?.name}
                loading={actionLoading}
            />
        </div>
    )
}

export default ClientPage