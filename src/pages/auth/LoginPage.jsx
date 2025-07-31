import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Home, Mail } from 'lucide-react';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField';
import PasswordInput from '../../components/PasswordInput';
import { authService } from '../../services/authService';
import { useAuth } from '../../contexts/UserContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const { login } = useAuth(); 

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Email invalide").required("Champ requis"),
        password: Yup.string().required("Champ requis"),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            setIsSubmitting(true);
            setSubmitStatus(null);

            const result = await authService.login({
                email: values.email,
                password: values.password,
            });
            
            if (result.success && result.token) {
				const { token, user } = result;
                console.log({token, user})
				login(user, token);

                setSubmitStatus({
                    type: 'success',
                    message: 'Connexion réussie',
                });

                navigate('/');
            } else {
                console.log('DISOOOOO')
                setSubmitStatus({
                    type: 'error',
                    message: result.message || 'Échec de la connexion',
                });

                if (result.fieldError) {
                    setFieldError(result.fieldError.field, result.fieldError.message);
                }
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: "Une erreur inattendue est survenue",
            });
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Link to="/" className="flex items-center justify-center mb-6">
                        <Home className="w-12 h-12 text-purple-400 mr-3" />
                        <span className="text-3xl font-bold text-white">Simulio</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-white">Connectez-vous à votre compte</h2>
                    <p className="mt-2 text-gray-400">
                        Ou{' '}
                        <Link to="/register" className="text-purple-400 hover:text-purple-300">
                            créez un nouveau compte
                        </Link>
                    </p>
                </div>

                {submitStatus && (
                    <div
                        className={`text-center text-sm font-medium p-2 rounded ${
                            submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}
                    >
                        {submitStatus.message}
                    </div>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <InputField
                                label="Adresse email"
                                name="email"
                                type="email"
                                placeholder="votre@email.com"
                                icon={Mail}
                            />
                            <PasswordInput
                                label="Mot de passe"
                                name="password"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </div>
                    </Form>
                </Formik>

                <div className="text-center">
                    <Link to="/" className="text-gray-400 hover:text-purple-400">
                        ← Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
