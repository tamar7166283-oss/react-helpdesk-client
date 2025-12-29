import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store";
import { formatDateDivider } from "../GlobalFunctions/forStyle";
import type { Comment } from "../types/comments";
import {
    Box,
    Paper,
    Stack,
    Typography,
    Avatar,
    Chip,
} from '@mui/material';
import {
    Person as PersonIcon,
    ChatBubbleOutline as CommentIcon
} from '@mui/icons-material';



interface CommentListProps {
    comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);
    // Format time (HH:MM)
    const formatTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'עכשיו';
            }
            return date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
        } catch {
            return 'עכשיו';
        }
    };


    // Check if date divider is needed
    const shouldShowDateDivider = (index: number) => {
        if (index === 0) return true;
        try {
            const currentDate = new Date(comments[index].created_at).toDateString();
            const prevDate = new Date(comments[index - 1].created_at).toDateString();
            return currentDate !== prevDate;
        } catch {
            return false;
        }
    };

    return (
        <Paper
            elevation={2}
            sx={{
                borderRadius: 3,
                mt: 3,
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <Box 
                sx={{ 
                    p: 2.5, 
                    borderBottom: '1px solid', 
                    borderColor: 'divider', 
                    bgcolor: 'white' 
                }}
                dir="rtl"
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <CommentIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                        תגובות ({comments.length})
                    </Typography>
                </Stack>
            </Box>

            {/* Timeline Area */}
            <Box
                ref={scrollRef}
                dir="rtl"
                sx={{
                    bgcolor: 'grey.50',
                    p: 3,
                    maxHeight: '500px',
                    overflowY: 'auto',
                    fontFamily: '"Assistant", "Roboto", sans-serif',
                    '&::-webkit-scrollbar': {
                        width: '8px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#cbd5e0',
                        borderRadius: '4px'
                    }
                }}
            >
                {comments.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            אין תגובות עדיין. היה הראשון להגיב!
                        </Typography>
                    </Box>
                )}

                {/* Timeline */}
                <Box sx={{ position: 'relative' }}>
                    {comments.map((comment, index) => {
                        const isLast = index === comments.length - 1;
                        // Determine if this is my comment or another user's comment
                        const isMyComment = comment.author_id === currentUser?.id;
                        // If it's my comment, use my role. Otherwise assume it's agent/customer opposite to me
                        const avatarColor = isMyComment 
                            ? (currentUser?.role === 'agent' ? 'secondary.main' : 'primary.main')
                            : (currentUser?.role === 'agent' ? 'primary.main' : 'secondary.main');

                        return (
                            <Box key={comment.id} sx={{ position: 'relative', pb: isLast ? 0 : 2.5 }}>
                                {/* Date Divider */}
                                {shouldShowDateDivider(index) && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                        <Chip
                                            label={formatDateDivider(comment.created_at)}
                                            size="small"
                                            sx={{
                                                bgcolor: 'white',
                                                color: 'text.secondary',
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                height: 24,
                                                border: '1px solid',
                                                borderColor: 'divider'
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* Timeline Item */}
                                <Stack direction="row" spacing={2} sx={{ position: 'relative' }}>
                                    {/* Timeline Line & Dot */}
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '44px',
                                            flexShrink: 0
                                        }}
                                    >
                                        {/* Avatar/Dot */}
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                bgcolor: avatarColor,
                                                fontSize: '0.875rem',
                                                fontWeight: 700,
                                                border: '3px solid',
                                                borderColor: 'grey.50',
                                                zIndex: 1,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            {comment.author_name?.charAt(0) || <PersonIcon fontSize="small" />}
                                        </Avatar>

                                        {/* Vertical Line */}
                                        {!isLast && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '44px',
                                                    bottom: '-16px',
                                                    width: '2px',
                                                    bgcolor: 'divider',
                                                    right: '19px'
                                                }}
                                            />
                                        )}
                                    </Box>

                                    {/* Content Area */}
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        {/* Name + Time Header */}
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{ mb: 0.5 }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight={700}
                                                sx={{
                                                    color: avatarColor,
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {comment.author_name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.disabled"
                                                sx={{ fontSize: '0.7rem' }}
                                            >
                                                • {formatTime(comment.created_at)}
                                            </Typography>
                                        </Stack>

                                        {/* Comment Bubble */}
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                display: 'inline-block',
                                                maxWidth: '85%',
                                                p: 1.5,
                                                bgcolor: 'white',
                                                borderRadius: '12px',
                                                borderTopRightRadius: '4px',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                position: 'relative',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                                                    transform: 'translateX(-2px)'
                                                }
                                            }}
                                        >
                                            {/* Message Text */}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.primary',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                    lineHeight: 1.5,
                                                    textAlign: 'right',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {comment.content}
                                            </Typography>

                                            {/* Speech Bubble Triangle */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: '-6px',
                                                    width: 0,
                                                    height: 0,
                                                    borderStyle: 'solid',
                                                    borderWidth: '6px 0 6px 6px',
                                                    borderColor: 'transparent transparent transparent white'
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: -1,
                                                    right: '-7px',
                                                    width: 0,
                                                    height: 0,
                                                    borderStyle: 'solid',
                                                    borderWidth: '7px 0 7px 7px',
                                                    borderColor: 'transparent transparent transparent',
                                                    borderLeftColor: 'divider'
                                                }}
                                            />
                                        </Paper>
                                    </Box>
                                </Stack>
                            </Box>
                        );
                    })}
                </Box>

            </Box>
        </Paper>
    );
};

export default CommentList;