import { AlertTriangle, X } from 'lucide-react'

const DeleteModal = ({ isOpen, onClose, onConfirm, clientName, loading }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-gray-800 rounded-3xl p-8 mx-4 w-full max-w-md border border-red-500/30 shadow-2xl shadow-red-500/20 animate-in fade-in duration-300 zoom-in-95">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
                    disabled={loading}
                >
                    <X size={20} className="text-gray-400" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-red-500/20 border border-red-500/30">
                        <AlertTriangle size={32} className="text-red-400" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Confirmer la suppression
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                        Êtes-vous sûr de vouloir supprimer le client{' '}
                        <span className="font-semibold text-purple-300">"{clientName}"</span> ?
                    </p>
                    <p className="text-sm text-red-400 mt-2">
                        Cette action est irréversible.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 py-3 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors duration-200 disabled:opacity-50"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {loading ? 'Suppression...' : 'Supprimer'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal