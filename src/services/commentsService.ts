import {type Comment, type CreateCommentDto } from "../types/comments";
import api from "./api";

const commentsService ={
    fetchCommentsByTicketId: async (ticketId: number): Promise<Comment[]> => {
        const response = await api.get<Comment[]>(`/tickets/${ticketId}/comments`);
        return response.data;
    },
    addComment: async (ticketId: number, data: CreateCommentDto): Promise<Comment> => {
        const response = await api.post<Comment>(`/tickets/${ticketId}/comments`, { content: data.content });
        return response.data;
    }
}
   
export default commentsService;