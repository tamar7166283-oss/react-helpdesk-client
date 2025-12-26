import {type CreateTicketDto, type Ticket, type TicketStatus } from "../types/tickets";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "../services/ticketService";
import {logout} from './authSlice';

interface TicketsState {
    tickets: Ticket[];
    selectedTicket: Ticket | null;
    error: string | null;
    loading: boolean;
    statusLoading: boolean;
    updateLoading: boolean;
    statuses: TicketStatus[];
}

const initialState: TicketsState = {
    tickets: [],
    selectedTicket: null,
    error: null,
    loading:false,
    statusLoading:false,
    updateLoading:false,
    statuses:[]       
};

export const getTickets = createAsyncThunk('tickets/fetchAll', async () => {
    const tickets = await ticketService.fetchTickets();
    return tickets;
});

export const createTicket = createAsyncThunk('tickets/create', async (ticket: CreateTicketDto) => {
    const newTicket = await ticketService.createTicket(ticket);
    return newTicket;
});

export const getTicketById = createAsyncThunk('tickets/fetchById', async (id: number) => {
    const ticket = await ticketService.fetchTicketById(id);
    return ticket;
});

export const updateTicket = createAsyncThunk('tickets/update', async ({id, data}: {id: number, data: Partial<Ticket>}) => {
    const updatedTicket = await ticketService.updateTicket(id, data);
    return updatedTicket;
});

export const fetchStatuses = createAsyncThunk('tickets/fetchStatuses', async () => {
    console.log("Fetching statuses...");
    const statuses = await ticketService.fetchStatuses();
    return statuses;
});

const TicketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.loading = false
                state.tickets = action.payload || [];
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch tickets";
            })
            .addCase(logout, state => {  
                state.tickets = [];
                state.error = null;
                state.loading = false;
            })
            .addCase(createTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets.push(action.payload);
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create ticket";
            })
            .addCase(getTicketById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTicketById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTicket = action.payload;
            })
            .addCase(getTicketById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch ticket by id";
            })
            .addCase(updateTicket.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateTicket.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.selectedTicket = action.payload;
                const index = state.tickets.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.tickets[index] = action.payload;
                }
                state.selectedTicket = action.payload;
            })
            .addCase(updateTicket.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.error.message || "Failed to update ticket";
            })
            .addCase(fetchStatuses.pending, (state) => {
                state.statusLoading = true;
                state.error = null;
            })
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                state.statusLoading = false;
                state.statuses = action.payload;
            })
            .addCase(fetchStatuses.rejected, (state, action) => {
                state.statusLoading = false;
                state.error = action.error.message || "Failed to fetch statuses";
            });
    }
});

export default TicketSlice.reducer;