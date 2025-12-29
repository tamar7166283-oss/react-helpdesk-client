import { useSelector,useDispatch } from "react-redux"
import type { RootState,AppDispatch } from "../store";
import { getTicketById, clearError } from "../store/ticketsSlice";
import { useEffect, useState } from "react";
import AdminAction from "../components/AdminAction";
import { useParams,useNavigate } from "react-router-dom";
import ChangeStatus from "../components/ChangeStatus";
import CommentList from "../components/CommentList";
import { AddComment } from "../components/AddComment";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDate } from '../GlobalFunctions/forStyle';
import type { Comment } from "../types/comments";
import commentsService from "../services/commentsService";
import {
    Box,
    Container,
    Paper,
    Typography,
    Stack,
    Avatar,
    Divider
} from '@mui/material';
import {
    ConfirmationNumber as TicketIcon,
    Description as DescriptionIcon,
    Person as PersonIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import EmptyState from "../components/EmptyState";
import { showErrorAlert } from '../utils/sweetAlertUtils';


export default function TicketDetailsPage() {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const {selectedTicket, loading}= useSelector((state: RootState) => state.tickets);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    // ניהול Comments ב-useState
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState<boolean>(true);

    // טעינת Comments
    useEffect(() => {
        const loadComments = async () => {
            if (!id) return;
            
            setCommentsLoading(true);
            try {
                const fetchedComments = await commentsService.fetchCommentsByTicketId(Number(id));
                setComments(fetchedComments);
            } catch (err: any) {
                console.error("Error fetching comments:", err);
                const errorMessage = err.response?.data?.message || "נכשלה טעינת התגובות";
                showErrorAlert('שגיאה בטעינת תגובות', errorMessage);
            } finally {
                setCommentsLoading(false);
            }
        };

        loadComments();
    }, [id]);

useEffect(() => {
    if (!id) return;

    dispatch(getTicketById(Number(id)))
        .unwrap()
        .catch((error: { status: number; message?: string }) => {
            if (error.status === 403 || error.status === 401) {
                showErrorAlert(
                    'אין גישה',
                    'אין לך הרשאה לצפות בטיקט זה'
                ).then(() => {
                    dispatch(clearError());
                    navigate('/tickets');
                });
            } 
            // 4. טיפול בדף שלא קיים
            else if (error.status === 404) {
                dispatch(clearError());
                navigate('/404');
            } else {
                // טיפול בשגיאות כלליות
                showErrorAlert(
                    'שגיאה',
                    error.message || 'אירעה שגיאה בטעינת הטיקט'
                ).then(() => {
                    dispatch(clearError());
                    navigate('/tickets');
                });
            }
        });
}, [id, dispatch, navigate]);

    if (loading) {
        return <LoadingSpinner message='טוען פרטי טיקט...' />;
    }

    if (!selectedTicket) {
        return <EmptyState message="לא נמצא טיקט זה." fullHeight={true} />;
    }
    return (
        <Box dir="rtl">
            <Container maxWidth="md">
                {/* Header Card */}
                <Paper 
                    elevation={1} 
                    sx={{ 
                        p: 2, 
                        mb: 2, 
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <Stack spacing={2}>
                        {/* Title Section */}
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: 1.5,
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <TicketIcon sx={{ fontSize: 22, color: 'white' }} />
                            </Box>
                            <Box flex={1}>
                                <Typography variant="caption" sx={{ color: '#718096', display: 'block', mb: 0.25, fontSize: '0.7rem' }}>
                                    טיקט #{selectedTicket.id}
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    fontWeight={700} 
                                    sx={{ color: '#2d3748', fontSize: '1.1rem' }}
                                >
                                    {selectedTicket.subject}
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider />

                        {/* Ticket Info Grid */}
                        <Box 
                            sx={{ 
                                display: 'grid',
                                gridTemplateColumns: { 
                                    xs: '1fr', 
                                    sm: 'repeat(2, 1fr)', 
                                    md: role === 'admin' ? 'repeat(4, 1fr)' : role === 'agent' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'
                                },
                                gap: 1.5,
                                p: 2,
                                bgcolor: '#f9fafb',
                                borderRadius: 2,
                                border: '1px solid #e2e8f0'
                            }}
                        >
                            {/* Status */}
                            <Box>
                                <Typography variant="caption" sx={{ color: '#718096', display: 'block', mb: 0.25, fontSize: '0.7rem' }}>
                                    📊 סטטוס
                                </Typography>
                                <Typography variant="body2" fontWeight={600} sx={{ color: '#2d3748', fontSize: '0.875rem' }}>
                                    {selectedTicket.status_name || 'לא ידוע'}
                                </Typography>
                            </Box>

                            {/* Priority - Only Admin sees this */}
                            {role === 'admin' && (
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#718096', display: 'block', mb: 0.25, fontSize: '0.7rem' }}>
                                        🚩 עדיפות
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} sx={{ color: '#2d3748', fontSize: '0.875rem' }}>
                                        {selectedTicket.priority_name || 'ללא'}
                                    </Typography>
                                </Box>
                            )}

                            {/* Created Date */}
                            <Box>
                                <Typography variant="caption" sx={{ color: '#718096', display: 'block', mb: 0.25, fontSize: '0.7rem' }}>
                                    📅 תאריך יצירה
                                </Typography>
                                <Typography variant="body2" fontWeight={600} sx={{ color: '#2d3748', fontSize: '0.875rem' }}>
                                    {formatDate(selectedTicket.created_at)}
                                </Typography>
                            </Box>

                            {/* Updated Date */}
                            <Box>
                                <Typography variant="caption" sx={{ color: '#718096', display: 'block', mb: 0.25, fontSize: '0.7rem' }}>
                                    🔄 עודכן לאחרונה
                                </Typography>
                                <Typography variant="body2" fontWeight={600} sx={{ color: '#2d3748', fontSize: '0.875rem' }}>
                                    {selectedTicket.updated_at ? formatDate(selectedTicket.updated_at) : 'לא עודכן'}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        {/* People Info */}
                        <Stack 
                            direction={{ xs: 'column', md: 'row' }} 
                            spacing={2}
                            divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />}
                        >
                            {/* Created By */}
                            <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                <Avatar sx={{ bgcolor: '#667eea', width: 32, height: 32 }}>
                                    <PersonIcon sx={{ fontSize: 16 }} />
                                </Avatar>
                                <Box flex={1}>
                                    <Typography variant="caption" sx={{ color: '#718096', fontSize: '0.7rem' }}>
                                        נוצר על ידי
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600} sx={{ color: '#2d3748', fontSize: '0.875rem' }}>
                                        {selectedTicket.created_by_name}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <EmailIcon sx={{ fontSize: 10, color: '#718096' }} />
                                        <Typography variant="caption" sx={{ color: '#718096', fontSize: '0.7rem' }}>
                                            {selectedTicket.created_by_email}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>

                            {/* Assigned To - Only Admin sees this */}
                            {role === 'admin' && (
                                <Stack direction="row" alignItems="center" spacing={1} flex={1}>
                                    <Avatar sx={{ bgcolor: '#764ba2', width: 32, height: 32, fontSize: '0.875rem' }}>
                                        {selectedTicket.assigned_to_name ? selectedTicket.assigned_to_name.charAt(0) : '?'}
                                    </Avatar>
                                    <Box flex={1}>
                                        <Typography variant="caption" sx={{ color: '#718096', fontSize: '0.7rem' }}>
                                            מוקצה ל
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600} sx={{ color: '#2d3748', fontSize: '0.875rem' }}>
                                            {selectedTicket.assigned_to_name || 'לא שויך'}
                                        </Typography>
                                        {selectedTicket.assigned_to_email && (
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <EmailIcon sx={{ fontSize: 10, color: '#718096' }} />
                                                <Typography variant="caption" sx={{ color: '#718096', fontSize: '0.7rem' }}>
                                                    {selectedTicket.assigned_to_email}
                                                </Typography>
                                            </Stack>
                                        )}
                                    </Box>
                                </Stack>
                            )}
                        </Stack>

                        <Divider />

                        {/* Description */}
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                <DescriptionIcon sx={{ color: '#667eea', fontSize: 16 }} />
                                <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#2d3748', fontSize: '0.875rem' }}>
                                    תיאור הבעיה
                                </Typography>
                            </Stack>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    bgcolor: '#f9fafb',
                                    borderRadius: 2,
                                    border: '1px solid #e2e8f0'
                                }}
                            >
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#4a5568', fontSize: '0.875rem' }}>
                                    {selectedTicket.description}
                                </Typography>
                            </Paper>
                        </Box>
                    </Stack>
                </Paper>

                {/* Actions Section - Only for Admin and Agent */}
                {(role === 'admin' || role === 'agent') && (
                    <Paper 
                        elevation={1} 
                        sx={{ 
                            p: 2, 
                            mb: 2, 
                            borderRadius: 2,
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2, color: '#2d3748', fontSize: '0.875rem' }}>
                            ⚙️ פעולות ניהול
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            {/* Change Status - Both Admin and Agent */}
                            <ChangeStatus idT={Number(id)} />
                            
                            {/* Assign to Agent - Only Admin */}
                            {role === 'admin' && <AdminAction idT={Number(id)} />}
                        </Stack>
                    </Paper>
                )}
                

                {/* Comments Section */}
                {commentsLoading ? (
                    <LoadingSpinner message="טוען תגובות..." />
                ) : (
                    <CommentList comments={comments} />
                )}

                {/* Add Comment */}
                {(role === 'customer' || role === 'agent') && (
                    <AddComment 
                        ticketId={Number(id)} 
                        setComments={setComments}
                    />
                )}
            </Container>
        </Box>
    );
}
    