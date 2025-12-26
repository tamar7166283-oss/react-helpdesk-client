

export type Role = 'admin' | 'customer' | 'agent';

export default interface User {
    id: number;     
    name: string;
    email: string;
    role: Role;   
    created_at?: string;
}