export interface Ticket {
    id: number;
    subject: string;
    description: string;
    status_id: number | null;
    priority_id: number | null;
    status_name: string | null;
    priority_name: string | null;
    created_by: number;
    assigned_to: number | null;
    assigned_to_name: string | null;
    assigned_to_email: string | null;
    created_at: string;
    updated_at: string | null;
    created_by_name: string;
    created_by_email: string;
}

export interface TicketStatus {
    id: number;
    name: string;
}

export interface TicketPriority {
    id: number;
    name: string;
}

export type CreateTicketDto = Pick<Ticket, 'subject' |'description'|'status_id'| 'priority_id' | 'assigned_to'>;