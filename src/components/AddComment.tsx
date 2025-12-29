import { useState } from "react";
import { useForm } from "react-hook-form";
import { showSuccessToast, showErrorAlert } from '../utils/sweetAlertUtils';
import type { Comment } from "../types/comments";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import {
    Send as SendIcon
} from '@mui/icons-material';
import commentsService from "../services/commentsService";

interface CommentFormValue {
    comment: string;
}

interface AddCommentProps {
    ticketId: number;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export const AddComment = ({ ticketId, setComments }: AddCommentProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentFormValue>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addComment = async (data: CommentFormValue) => {
        setLoading(true);
        setError(null);
        try {
            const newComment = await commentsService.addComment(ticketId, { content: data.comment });

            setComments(prev => [...prev, newComment]);

            reset();
            showSuccessToast('תגובה נוספה', 'התגובה שלך התווספה בהצלחה');
        } catch (error: any) {
            console.error("Failed to add comment:", error);
            const errorMessage = error.response?.data?.message || 'לא ניתן להוסיף את התגובה';
            setError(errorMessage);
            showErrorAlert('שגיאה בהוספת תגובה', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleSubmit(addComment)();
        }
    };

    return (
        <Paper
            dir="rtl"
            elevation={2}
            sx={{
                borderRadius: 3,
                p: 3,
                mt: 3,
                bgcolor: 'white',
                fontFamily: '"Assistant", "Roboto", sans-serif'
            }}
        >
            <form onSubmit={handleSubmit(addComment)}>
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                            color: 'text.primary',
                            mb: 2,
                            textAlign: 'right'
                        }}
                    >
                        הוסף תגובה
                    </Typography>

                    {/* Textarea */}
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="כתוב תגובה כאן..."
                        variant="outlined"
                        {...register('comment', { required: "נא להזין תגובה" })}
                        onKeyDown={handleKeyDown}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'grey.50',
                                fontFamily: '"Assistant", "Roboto", sans-serif',
                                fontSize: '0.95rem',
                                '& fieldset': {
                                    borderColor: 'divider',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    borderWidth: '2px'
                                }
                            },
                            '& .MuiInputBase-input': {
                                color: 'text.primary',
                                textAlign: 'right'
                            }
                        }}
                    />

                    {errors.comment && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'error.main',
                                display: 'block',
                                mt: 1,
                                fontSize: '0.75rem',
                                textAlign: 'right'
                            }}
                        >
                            {errors.comment.message}
                        </Typography>
                    )}

                    {/* Server Error */}
                    {error && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'error.main',
                                display: 'block',
                                mt: 1,
                                fontSize: '0.75rem',
                                textAlign: 'right'
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* Action Bar */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2
                        }}
                    >
                        {/* Right Side - Send Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon sx={{ transform: 'rotate(180deg)' }} />}
                            sx={{
                                borderRadius: 2,
                                px: 3.5,
                                py: 1.2,
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                fontFamily: '"Assistant", "Roboto", sans-serif',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)'
                                },
                                '&:disabled': {
                                    background: '#e2e8f0',
                                    color: '#a0aec0',
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            {loading ? 'שולח...' : 'שלח תגובה'}
                        </Button>

                        {/* Left Side - Helper Text */}
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.7rem',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            }}
                        >
                            💡 Ctrl + Enter לשליחה מהירה
                        </Typography>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
};

export default AddComment;


