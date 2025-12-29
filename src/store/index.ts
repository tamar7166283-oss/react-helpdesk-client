import usersReducer from './usersSlice.ts';
import authReducer from './authSlice.ts';
import ticketsReducer from './ticketsSlice.ts';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets: ticketsReducer,
        users: usersReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


