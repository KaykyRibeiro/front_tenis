import api from "./api";

export const usuarioService = {
  async createProfessor(data: any) {
    const response = await api.post("/usuario/register", data);
    return response.data;
  },
};