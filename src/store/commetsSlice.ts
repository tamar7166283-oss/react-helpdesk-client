import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "../services/commentsService";
import { type Comment, type CreateCommentDto } from "../types/comments";
interface CommentState {
comments: Comment[];
loading: boolean;
error:string|null;

}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null,
};

export const fetchCommentsByTicketId=createAsyncThunk<Comment[],number>('comments/fetchByTicketId', async (ticketId: number) => {
    const comments = await commentsService.fetchCommentsByTicketId(ticketId);
    return comments;
});

export const addCommentToTicket=createAsyncThunk<Comment, {ticketId: number, data: CreateCommentDto}>('comments/addToTicket', async ({ticketId, data}: {ticketId: number, data: CreateCommentDto}) => {
    const newComment = await commentsService.addComment(ticketId, data);
    return newComment;
});

 export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByTicketId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommentsByTicketId.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchCommentsByTicketId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch comments";
            })
            .addCase(addCommentToTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCommentToTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            })
            .addCase(addCommentToTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add comment";
            });
    }
});

export default commentsSlice.reducer;