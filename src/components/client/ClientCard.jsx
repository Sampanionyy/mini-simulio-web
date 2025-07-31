import { Mail, MapPin, User, Edit, Trash2, Phone, Calculator } from 'lucide-react'

const ClientCard = ({ client, onEdit, onDelete, onAssignSimulation }) => {
    return (
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-purple-700 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-400 text-gray-900 p-2 rounded-full">
                        <User size={20} />
                    </div>
                    <h2 className="text-xl font-semibold text-purple-300">{client.name}</h2>
                </div>
                
                <div className="flex gap-2">
                    <button
                        onClick={() => onAssignSimulation(client)}
                        className="relative p-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-emerald-500/25 group overflow-hidden"
                        title="Attribuer une simulation"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <Calculator size={16} className="relative z-10" />
                    </button>
                    <button
                        onClick={() => onEdit(client)}
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 hover:scale-105"
                        title="Modifier"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(client)}
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 hover:scale-105"
                        title="Supprimer"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="text-blue-400" size={18} />
                    <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="text-green-400" size={18} />
                    <span>+33 {client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="text-blue-400" size={18} />
                    <span>{client.address}</span>
                </div>
            </div>
        </div>
    )
}

export default ClientCard