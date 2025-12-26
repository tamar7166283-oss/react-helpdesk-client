import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type User from '../types/users';



interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    token: localStorage.getItem('token') || null
}; 

const authSlice = createSlice({
    name: 'auth',
    initialState,   
    reducers: {
        setCredentials: (state, action:PayloadAction<{ user: User, token: string }>) => {
            const { user, token } = action.payload;
            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            console.log('Logging out, removing token from localStorage');
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
                        console.log('Logging out, removing token from localStorage');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;