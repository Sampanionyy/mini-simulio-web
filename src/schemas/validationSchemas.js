import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, 'Le prénom doit contenir au moins 2 caractères')
        .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
        .required('Le prénom est requis'),
    name: Yup.string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(50, 'Le nom ne peut pas dépasser 50 caractères')
        .required('Le nom est requis'),
    email: Yup.string()
        .email('Adresse email invalide')
        .required('L\'email est requis'),
    password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
        )
        .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
        .required('La confirmation du mot de passe est requise')
});