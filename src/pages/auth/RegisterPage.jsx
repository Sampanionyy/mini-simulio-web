import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';
import { authService } from '../../services/authService';
import StatusMessage from '../../components/StatusMessage';

const RegisterPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (values, { setSubmitting, setFieldError, resetForm }) => {
        try {
            setIsSubmitting(true);
            setSubmitStatus(null);

            const userData = {
                firstName: values.firstName,
                name: values.name,
                email: values.email,
                password: values.password
            };

            const result = await authService.register(userData);
            if (result.success) {
                setSubmitStatus({
                    type: 'success',
                    message: result.message
                });
                resetForm();
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: result.message
                });

                if (result.fieldError) {
                    setFieldError(result.fieldError.field, result.fieldError.message);
                }
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Une erreur inattendue est survenue'
            });
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };

    const footerLinks = (
        <>
            <p className="text-gray-400">
                Déjà un compte ?{" "}
                <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                    Se connecter
                </a>
            </p>
            <div className="mt-4 text-xs text-gray-500 text-center">
                <p>💡 Testez avec "test@error.com" pour voir la gestion d'erreur</p>
            </div>
        </>
    );

    return (
        <AuthLayout
            title="Créer un compte"
            subtitle="Rejoignez-nous dès aujourd'hui"
            icon={UserCheck}
            footerLinks={footerLinks}
        >
            <StatusMessage status={submitStatus} />
            <RegisterForm 
                onSubmit={handleSubmit} 
                isSubmitting={isSubmitting} 
            />
        </AuthLayout>
    );
};

export default RegisterPage;