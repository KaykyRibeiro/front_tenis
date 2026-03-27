import api from "./api";

export const homeService = {
    async getUsuarios() {
        const response = await api.get("/usuario/all");
        return response.data;
    }, 

    async getAulas() {
        const response = await api.get("/agendamento/all");
        return response.data;
    },

    async getAlunos() {
        const response = await api.get("/usuario/alunos");
        return response.data;
    },

    async getAulasHoje() {
        const response = await api.get("/agendamento/today");
        return response.data;
    }
}