import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "../services/usersService";
import type User from "../types/users";

interface UsersState {
    users: User[];
    error: string | null;
    loading: boolean;
}

const initialState: UsersState = {
    users: [],
    error: null,
    loading: false
};

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
    const users = await usersService.fetchUsers();
    return users;
});

export const createUser = createAsyncThunk('users/create', async (userData: {name: string, email: string, password: string, role: string}) => {
    const user = await usersService.createUser(userData.name, userData.email, userData.password, userData.role);
    return user;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },   
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })  
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload || [];
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create user";
            });
    }
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;