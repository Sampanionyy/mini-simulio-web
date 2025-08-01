import { Calculator, AlertCircle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

const SimulationForm = ({ onSubmit, isLoading, submitError }) => {
    const formik = useFormik({
        initialValues: {
            prix_bien: '',
            apport: '',
            duree_annees: '20',
            taux_interet: '3.5',
            taux_assurance: '0.32',
            mois_debut: new Date().getMonth() + 1,
            annee_debut: new Date().getFullYear(),
            frais_agence: '',
            frais_notaire: '',
            travaux: '0',
            revalorisation_bien: '2.0',
        },
        validationSchema: Yup.object({
            prix_bien: Yup.number()
                .required('Le prix du bien est requis')
                .moreThan(0, 'Le prix du bien doit être positif'),
            apport: Yup.number()
                .required('L\'apport personnel est requis')
                .min(0, 'L\'apport personnel doit être positif ou nul')
                .test(
                    'apport-moins-que-prix',
                    'L\'apport ne peut pas être supérieur ou égal au prix du bien',
                    function (value) {
                        const { prix_bien } = this.parent;
                        return parseFloat(value || '0') < parseFloat(prix_bien || '0');
                    }
                ),
            taux_interet: Yup.number()
                .required('Le taux d\'intérêt est requis')
                .moreThan(0, 'Le taux d\'intérêt doit être positif'),
            taux_assurance: Yup.number()
                .required('Le taux d\'assurance est requis')
                .min(0, 'Le taux d\'assurance doit être positif ou nul'),
            frais_agence: Yup.number()
                .required('Les frais d\'agence sont requis')
                .min(0, 'Les frais d\'agence doivent être positifs ou nuls'),
            frais_notaire: Yup.number()
                .required('Les frais de notaire sont requis')
                .min(0, 'Les frais de notaire doivent être positifs ou nuls'),
            travaux: Yup.number()
                .min(0, 'Les frais de travaux doivent être positifs ou nuls'),
            revalorisation_bien: Yup.number()
                .required('Le taux de revalorisation est requis')
                .min(0, 'Le taux de revalorisation doit être positif ou nul'),
        }),
        onSubmit: onSubmit
    });

    const generateMonthOptions = () => {
        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return months.map((month, index) => (
            <option key={index + 1} value={index + 1}>
                {month}
            </option>
        ));
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i <= currentYear + 5; i++) {
            years.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return years;
    };

    const formFields = [
        { name: 'prix_bien', label: 'Prix du bien (€)', placeholder: '300000' },
        { name: 'apport', label: 'Apport personnel (€)', placeholder: '60000' },
        { name: 'frais_agence', label: "Frais d'agence (%)", placeholder: '1.0' },
        { name: 'frais_notaire', label: 'Frais de notaire (%)', placeholder: '2.0' },
        { name: 'travaux', label: 'Travaux (€)', placeholder: '0' },
        { name: 'taux_interet', label: "Taux d'intérêt (%)", placeholder: '3.5', step: '0.01' },
        { name: 'taux_assurance', label: "Taux d'assurance (%)", placeholder: '0.36', step: '0.01' },
        { name: 'revalorisation_bien', label: 'Revalorisation du bien (% annuel)', placeholder: '2.0', step: '0.1' }
    ];

    return (
        <form onSubmit={formik.handleSubmit} className="bg-gray-800 rounded-2xl p-8">
            <div className="flex items-center mb-6">
                <Calculator className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Paramètres du prêt</h2>
            </div>

            {submitError && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                    <span className="text-red-400">{submitError}</span>
                </div>
            )}

            <div className="space-y-6">
                {formFields.map(({ name, label, placeholder, step }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{label} *</label>
                        <input
                            type="number"
                            name={name}
                            step={step || 'any'}
                            value={formik.values[name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={placeholder}
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                                formik.touched[name] && formik.errors[name] ? 'border-red-500 focus:ring-red-400' : 'border-gray-600 focus:ring-purple-400'
                            }`}
                        />
                        {formik.touched[name] && formik.errors[name] && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors[name]}</p>
                        )}
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Durée du prêt (années) *</label>
                    <select
                        name="duree_annees"
                        value={formik.values.duree_annees}
                        onChange={formik.handleChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        {[15, 20, 25, 30].map(y => <option key={y} value={y}>{y} ans</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Mois de début *</label>
                        <select
                            name="mois_debut"
                            value={formik.values.mois_debut}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            {generateMonthOptions()}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Année de début *</label>
                        <select
                            name="annee_debut"
                            value={formik.values.annee_debut}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            {generateYearOptions()}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={formik.isSubmitting || isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                    {isLoading ? 'Calcul en cours...' : 'Calculer la mensualité'}
                </button>
            </div>
        </form>
    );
};

export default SimulationForm;