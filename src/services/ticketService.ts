import api from "./api";
import { type CreateTicketDto, type Ticket, type TicketPriority, type TicketStatus } from "../types/tickets";


const ticketService = {
    fetchTickets: async (): Promise<Ticket[] | null> => {
        const response = await api.get<Ticket[]|null>("/tickets"); 
        return response.data;
    },
    createTicket: async (ticket: CreateTicketDto): Promise<Ticket> => {
        const response = await api.post<Ticket>("/tickets", 
            {subject: ticket.subject,
             description: ticket.description,
             status_id: ticket.status_id,
             priority_id: ticket.priority_id, 
             assigned_to: ticket.assigned_to}); 
        return response.data;
    },
    fetchTicketById: async (id: number): Promise<Ticket> => {
        const response = await api.get<Ticket>(`/tickets/${id}`);
        return response.data;
    },
    updateTicket: async (id: number, data:Partial<Ticket>): Promise<Ticket> => {
        const response = await api.patch<Ticket>(`/tickets/${id}`, data);
        return response.data;
    },
    fetchStatuses: async (): Promise<TicketStatus[]> => {
        const response = await api.get<{id:number, name:string}[]>("/statuses");
        return response.data;
    },
    fetchPriorities: async (): Promise<TicketPriority[]> => {
        const response = await api.get<TicketPriority[]>("/priorities");
        return response.data;
    }

};

export default ticketService;
