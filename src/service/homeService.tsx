import api from "./api";

export const homeService = {
    async getUsuarios() {
        const response = await api.get("/usuario/all");
        return response.data;
    }, 

    async getAulasAgora() {
        const response = await api.get("/agendamento/all");
        return response.data;
    }
}