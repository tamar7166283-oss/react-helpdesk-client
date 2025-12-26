import type User from "../types/users";
import api from "./api";
const usersService = {
    
    fetchUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>("/users");
        return response.data;
    },
    createUser: async (name: string, email: string, password: string, role: string): Promise<User> => {
        const response = await api.post<User>("/users", { name, email, password, role });
        return response.data;
    }
}
export default usersService;