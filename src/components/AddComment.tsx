import {useForm} from "react-hook-form";
import { addCommentToTicket } from "../store/commetsSlice";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState} from "../store";
import {
    Box,
    TextField,
    Button,
    Paper,
    Alert,
    CircularProgress,
    IconButton,
    Stack
} from '@mui/material';
import {
    Send as SendIcon,
    EmojiEmotions as EmojiIcon
} from '@mui/icons-material';

interface CommentFormValue {
    comment: string;
}

interface AddCommentProps {
    ticketId: number;
}

export const AddComment = ({ ticketId }: AddCommentProps) => {

    const dispatch =useDispatch<AppDispatch>();
    const { register, handleSubmit,formState: { errors }, reset } = useForm<CommentFormValue>();
    const {loading,error} = useSelector((state: RootState) => state.comments);

    const addComment = (data: CommentFormValue) => {
        try{
            dispatch(addCommentToTicket({ticketId: ticketId, data: {content: data.comment}}));
            reset(); // ניקוי הטופס לאחר שליחה מוצלחת
        }
        catch(error){
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Paper 
                elevation={2}
                component="form" 
                onSubmit={handleSubmit(addComment)}
                sx={{ 
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    border: '2px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:focus-within': {
                        borderColor: 'primary.main',
                        boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)',
                    }
                }}
            >
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Stack spacing={2}>
                    <TextField
                        id="comment"
                        placeholder="הקלד את תגובתך כאן..."
                        multiline
                        rows={4}
                        fullWidth
                        disabled={loading}
                        {...register('comment', { 
                            required: "התגובה לא יכולה להיות רקה",
                            minLength: {
                                value: 2,
                                message: "התגובה חייבת להכיל לפחות 2 תווים"
                            }
                        })}
                        error={!!errors.comment}
                        helperText={errors.comment?.message}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'background.default',
                            }
                        }}
                    />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1}>
                            <IconButton 
                                size="small" 
                                color="primary"
                                disabled={loading}
                                sx={{ 
                                    '&:hover': { 
                                        bgcolor: 'action.hover' 
                                    } 
                                }}
                            >
                                <EmojiIcon />
                            </IconButton>
                        </Stack>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            sx={{
                                borderRadius: 2,
                                px: 4,
                                py: 1.5,
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: 4,
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {loading ? 'שולח...' : 'שלח תגובה'}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};

export default AddComment;


