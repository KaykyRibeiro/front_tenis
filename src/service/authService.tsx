import api from "./api";

export const VerifyLogin = async (usu_email: string, usu_senhaHash: string) => {
    console.log("Enviando login:", { usu_email, usu_senhaHash });
    return await api.post("/auth/login", { usu_email, usu_senhaHash });
};



