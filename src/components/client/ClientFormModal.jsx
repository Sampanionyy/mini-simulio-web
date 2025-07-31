import { useFormik } from 'formik'
import { X, User, Mail, MapPin, Save, Plus, Phone } from 'lucide-react'
import { clientValidationSchema, initialValues } from '../../schemas/clientValidation'

const ClientFormModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    client = null, 
    loading = false 
}) => {
    const isEditing = !!client
    
    const formik = useFormik({
        initialValues: client ? {
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address
        } : initialValues,
        validationSchema: clientValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            await onSubmit(values, client?.id)
            resetForm()
        },
        enableReinitialize: true
    })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            
            <div className="relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-3xl p-8 mx-4 w-full max-w-lg border border-purple-500/30 shadow-2xl shadow-purple-500/20 animate-in fade-in duration-300 zoom-in-95">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700/50 transition-colors group"
                    disabled={loading}
                >
                    <X size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-2xl ${isEditing ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-purple-500/20 border border-purple-500/30'}`}>
                        {isEditing ? (
                            <User size={24} className="text-blue-400" />
                        ) : (
                            <Plus size={24} className="text-purple-400" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {isEditing ? 'Modifier le client' : 'Nouveau client'}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {isEditing ? 'Modifiez les informations du client' : 'Ajoutez un nouveau client à votre base'}
                        </p>
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            <User size={16} className="text-purple-400" />
                            Nom complet
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                                formik.touched.name && formik.errors.name
                                    ? 'border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                            } text-white placeholder-gray-400`}
                            placeholder="Ex: Jean Dupont"
                            disabled={loading}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-400 text-sm flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                {formik.errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            <Mail size={16} className="text-purple-400" />
                            Adresse email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 border transition-all duration-200 focus:outline-none focus:ring-2 ${
                                formik.touched.email && formik.errors.email
                                    ? 'border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                            } text-white placeholder-gray-400`}
                            placeholder="Ex: jean.dupont@email.com"
                            disabled={loading}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-400 text-sm flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            <Phone size={16} className="text-purple-400" />
                            Numéro de téléphone
                        </label>
                        <div className="flex">
                            <div className="flex items-center px-4 py-3 rounded-l-xl bg-gray-600/50 border border-r-0 border-gray-600">
                                <span className="text-xl mr-2">🇫🇷</span>
                                <span className="text-white font-medium">+33</span>
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`flex-1 px-4 py-3 rounded-r-xl bg-gray-700/50 border border-l-0 transition-all duration-200 focus:outline-none focus:ring-2 ${
                                    formik.touched.phone && formik.errors.phone
                                        ? 'border-red-500 focus:ring-red-500/20'
                                        : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                                } text-white placeholder-gray-400`}
                                placeholder="6 12 34 56 78"
                                maxLength="10"
                                disabled={loading}
                            />
                        </div>
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-400 text-sm flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                {formik.errors.phone}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                            <MapPin size={16} className="text-purple-400" />
                            Adresse
                        </label>
                        <textarea
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows={3}
                            className={`w-full px-4 py-3 rounded-xl bg-gray-700/50 border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
                                formik.touched.address && formik.errors.address
                                    ? 'border-red-500 focus:ring-red-500/20'
                                    : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                            } text-white placeholder-gray-400`}
                            placeholder="Ex: 123 Rue de la Paix, 75001 Paris"
                            disabled={loading}
                        />
                        {formik.touched.address && formik.errors.address && (
                            <p className="text-red-400 text-sm flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                                {formik.errors.address}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 py-3 px-4 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 font-medium transition-all duration-200 border border-gray-600 hover:border-gray-500 disabled:opacity-50"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !formik.isValid}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2 ${
                                isEditing
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
                                    : 'bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50'
                            }`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={16} />
                                    {isEditing ? 'Modifier' : 'Ajouter'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ClientFormModal