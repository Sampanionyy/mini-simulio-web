import * as Yup from 'yup'

export const clientValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(50, 'Le nom ne peut pas dépasser 50 caractères')
        .required('Le nom est requis'),
    
    email: Yup.string()
        .email('Format d\'email invalide')
        .required('L\'email est requis'),
    
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Le numéro doit contenir exactement 10 chiffres')
        .required('Le numéro de téléphone est requis'),
    
    address: Yup.string()
        .min(5, 'L\'adresse doit contenir au moins 5 caractères')
        .max(100, 'L\'adresse ne peut pas dépasser 100 caractères')
        .required('L\'adresse est requise')
})

export const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: ''
}