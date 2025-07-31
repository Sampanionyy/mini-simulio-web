import api from './api';

export const clientService = {
    create: async (data) => {
        try {
            const response = await api.post('/clients', data);
            return {
                success: true,
                message: "Client créé avec succès",
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Erreur lors de la création du client',
            };
        }
    },

    getAll: async () => {
        try {
            const response = await api.get('/clients');
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Erreur lors de la récupération des clients',
            };
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/clients/${id}`);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || `Erreur lors de la récupération du client ${id}`,
            };
        }
    },

    update: async (id, data) => {
        try {
            const response = await api.put(`/clients/${id}`, data);
            return {
                success: true,
                message: "Client mis à jour avec succès",
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || `Erreur lors de la mise à jour du client ${id}`,
            };
        }
    },

    delete: async (id) => {
        try {
            await api.delete(`/clients/${id}`);
            return {
                success: true,
                message: "Client supprimé avec succès",
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || `Erreur lors de la suppression du client ${id}`,
            };
        }
    },
}
