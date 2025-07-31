import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { User, Mail } from 'lucide-react';
import InputField from '../InputField';
import PasswordInput from '../PasswordInput';
import { registerValidationSchema } from '../../schemas/validationSchemas';
import SubmitButton from '../SubmitButton';

const RegisterForm = ({ onSubmit, isSubmitting }) => {
    const initialValues = {
        firstName: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting: formikSubmitting }) => (
                <Form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="Prénom"
                            name="firstName"
                            placeholder="John"
                            icon={User}
                        />
                        <InputField
                            label="Nom"
                            name="name"
                            placeholder="Doe"
                            icon={User}
                        />
                    </div>

                    <InputField
                        label="Adresse email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        icon={Mail}
                    />

                    <PasswordInput
                        name="password"
                        label="Mot de passe"
                    />

                    <PasswordInput
                        name="confirmPassword"
                        label="Confirmer le mot de passe"
                    />
                    <ErrorMessage name="terms" component="div" className="text-red-500 text-sm" />

                    <SubmitButton
                        isSubmitting={isSubmitting || formikSubmitting}
                        loadingText="Création en cours..."
                        defaultText="Créer mon compte"
                    />
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;