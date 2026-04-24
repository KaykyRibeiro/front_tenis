import api from "./api";

export const aulaService = {

    async getAulas() {
        const response = await api.get("/agendamento/all");
        return response.data;
    },

}