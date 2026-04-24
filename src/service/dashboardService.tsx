import api from "./api";

export const dashboardService = {
   
    
    async getAlunos() {
        const response = await api.get("/usuario/alunos");
        return response.data;
    },

    async getProfessores() {
        const response = await api.get("/usuario/professor");
        return response.data;
    }
}