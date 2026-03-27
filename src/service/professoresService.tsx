import api from './api';

export const professoresService = {
    async getProfessores() {
        const response = await api.get("/usuario/professor");
        return response.data;
    },

    async getProfessorById(id: number) {
        const response = await api.get(`/usuario/professor/${id}`);
        return response.data;
    }
}