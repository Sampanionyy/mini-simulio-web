import api from './api';

export const simulationService = {
    store: async (data) => {
        try {
            const response = await api.post('/simulations', data);
            return {
                success: true,
                message: "Simulation réussie",
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Une erreur est survenue lors de la simulation',
            };
        }
    },
}