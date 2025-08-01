import api from './api';

export const authService = {
    register: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return {
                success: true,
                message: response.data.message
            };
        } catch (error) {
            return {
                success: false,
                message: 'Une erreur est survenue lors de la création du compte',
                fieldError: error.message.includes('email') ? { field: 'email', message: error.message } : null
            };
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            return {
                success: true,
                message: response.data.message,
                user: response.data.user,
                token: response.data.token
            };
        } catch (error) {
            return {
                success: false,
                message: 'Une erreur est survenue lors de la connexion'
            };
        }
    },

    logout: async () => {
        try {
            await api.post('/logout');
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Une erreur est survenue lors de la déconnexion'
            };
        }
    },

    getCurrentUser: async () => {
		const token = localStorage.getItem('token');
		const response = await api.get(`/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) throw new Error('Utilisateur non authentifié');
		return response.data; 
	},
};