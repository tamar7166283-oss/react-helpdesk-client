import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store";
import { fetchCommentsByTicketId } from "../store/commetsSlice";
import {
    Box,
    Typography,
    Avatar,
    Paper,
    Stack,
    CircularProgress,
    Alert,
    Chip
} from '@mui/material';
import {
    Schedule as TimeIcon,
    Message as MessageIcon
} from '@mui/icons-material';

interface CommentListProps {
    ticketId: number;
}

const CommentList = ({ ticketId }: CommentListProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const {comments, loading, error } = useSelector((state: RootState) => state.comments);
    const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

    useEffect(() => {
        dispatch(fetchCommentsByTicketId(ticketId));
    }, [dispatch, ticketId]);

    // פורמט תאריך
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'כרגע';
        if (diffMins < 60) return `לפני ${diffMins} דקות`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `לפני ${diffHours} שעות`;
        
        return date.toLocaleDateString('he-IL', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if(loading && comments.length===0){
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4 }}>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <MessageIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h5" fontWeight={600}>
                    שרשור תגובות
                </Typography>
                <Chip 
                    label={comments.length} 
                    color="primary" 
                    size="small" 
                    sx={{ fontWeight: 600 }}
                />
            </Stack>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    שגיאה בטעינת התגובות: {error}
                </Alert>
            )}

            {/* Comments Container - Chat Style */}
            <Box 
                sx={{ 
                    maxHeight: '600px',
                    overflowY: 'auto',
                    bgcolor: 'background.default',
                    borderRadius: 3,
                    p: 2,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        bgcolor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: 'divider',
                        borderRadius: '4px',
                        '&:hover': {
                            bgcolor: 'action.hover',
                        },
                    },
                }}
            >
                {comments && comments.map((comment, index) => {
                    const isCurrentUser = comment.author_id === currentUserId;
                    
                    return (
                        <Box 
                            key={comment.id}
                            sx={{ 
                                display: 'flex',
                                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                mb: 2.5,
                                animation: 'fadeInUp 0.3s ease-out',
                                animationDelay: `${index * 0.05}s`,
                                animationFillMode: 'backwards',
                                '@keyframes fadeInUp': {
                                    from: {
                                        opacity: 0,
                                        transform: 'translateY(10px)'
                                    },
                                    to: {
                                        opacity: 1,
                                        transform: 'translateY(0)'
                                    }
                                }
                            }}
                        >
                            <Stack 
                                direction={isCurrentUser ? 'row-reverse' : 'row'} 
                                spacing={1.5}
                                sx={{ maxWidth: '75%' }}
                            >
                                {/* Avatar */}
                                <Avatar 
                                    sx={{ 
                                        bgcolor: isCurrentUser ? 'secondary.main' : 'primary.main',
                                        width: 40,
                                        height: 40,
                                        fontSize: 16,
                                        fontWeight: 600
                                    }}
                                >
                                    {comment.author_name.charAt(0)}
                                </Avatar>

                                {/* Message Bubble */}
                                <Box sx={{ flex: 1 }}>
                                    {/* Author Name */}
                                    <Typography 
                                        variant="caption" 
                                        fontWeight={600}
                                        sx={{ 
                                            display: 'block',
                                            mb: 0.5,
                                            mr: isCurrentUser ? 0 : 1,
                                            ml: isCurrentUser ? 1 : 0,
                                            textAlign: isCurrentUser ? 'right' : 'left',
                                            color: 'text.secondary'
                                        }}
                                    >
                                        {comment.author_name}
                                        {isCurrentUser && ' (אני)'}
                                    </Typography>

                                    {/* Message Content */}
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 2,
                                            bgcolor: isCurrentUser 
                                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                                : 'background.paper',
                                            color: isCurrentUser ? 'white' : 'text.primary',
                                            borderRadius: isCurrentUser 
                                                ? '18px 18px 4px 18px' 
                                                : '18px 18px 18px 4px',
                                            background: isCurrentUser 
                                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                                : undefined,
                                            boxShadow: isCurrentUser 
                                                ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
                                                : undefined,
                                        }}
                                    >
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word'
                                            }}
                                        >
                                            {comment.content}
                                        </Typography>

                                        {/* Timestamp */}
                                        <Stack 
                                            direction="row" 
                                            alignItems="center" 
                                            spacing={0.5}
                                            sx={{ 
                                                mt: 1,
                                                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start'
                                            }}
                                        >
                                            <TimeIcon 
                                                sx={{ 
                                                    fontSize: 14,
                                                    color: isCurrentUser ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                                                }} 
                                            />
                                            <Typography 
                                                variant="caption"
                                                sx={{ 
                                                    color: isCurrentUser ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                                                    fontSize: 11
                                                }}
                                            >
                                                {formatDate(comment.created_at)}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Box>
                            </Stack>
                        </Box>
                    );
                })}

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                )}

                {comments.length === 0 && !loading && (
                    <Box 
                        sx={{ 
                            textAlign: 'center', 
                            py: 8,
                            bgcolor: 'background.paper',
                            borderRadius: 3
                        }}
                    >
                        <MessageIcon 
                            sx={{ 
                                fontSize: 60, 
                                color: 'action.disabled',
                                mb: 2 
                            }} 
                        />
                        <Typography variant="h6" color="text.secondary">
                            אין תגובות עדיין
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            היה הראשון להגיב על הטיקט הזה
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
export default CommentList;