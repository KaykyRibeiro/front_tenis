import api from "./api";

export const quadraService = {

    async getQuadras() {
        const response = await api.get("/quadra/all");
        return response.data;
    },

}