import api from "./api";
import type { LoginResponse } from "../types/auth";


const authService = {
    login: async (email: string, password: string):Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>("/auth/login", { email, password }); 
        return response.data;
    },
    register: async (email: string, password: string, name: string):Promise<LoginResponse> =>
        {     
        await api.post<LoginResponse>("/auth/register", { email, password, name });  
        return authService.login(email, password);
    },
};

export default authService;