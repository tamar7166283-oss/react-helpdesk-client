import { useSelector,useDispatch } from "react-redux"
import type { RootState,AppDispatch } from "../store";
import { getTicketById } from "../store/ticketsSlice";
import { useEffect } from "react";
import AgentAction from "../components/AgentAction";
import AdminAction from "../components/AdminAction";
import CustomerAction from "../components/CusomerAction";
import { useParams } from "react-router-dom";
import ChangeStatus from "../components/ChangeStatus";
import CommentList from "../components/CommentList";
import { AddComment } from "../components/AddComment";
import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Chip,
    Divider,
    CircularProgress,
    Alert,
    Avatar
} from '@mui/material';
import {
    ConfirmationNumber as TicketIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Schedule as TimeIcon,
    Flag as FlagIcon,
    Description as DescriptionIcon
} from '@mui/icons-material';

export default function TicketDetailsPage() {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const {selectedTicket, loading, error}= useSelector((state: RootState) => state.tickets);
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        dispatch(getTicketById(Number(id)));
    }, [id, dispatch]);

    // פונקציה להחזרת צבע סטטוס
    const getStatusColor = (statusName: string | null): "default" | "primary" | "success" | "warning" | "error" => {
        if (!statusName) return "default";
        const lowerStatus = statusName.toLowerCase();
        if (lowerStatus.includes('open') || lowerStatus.includes('פתוח')) return "primary";
        if (lowerStatus.includes('closed') || lowerStatus.includes('סגור')) return "default";
        if (lowerStatus.includes('progress') || lowerStatus.includes('בטיפול')) return "warning";
        if (lowerStatus.includes('resolved') || lowerStatus.includes('נפתר')) return "success";
        return "default";
    };

    // פונקציה להחזרת צבע עדיפות
    const getPriorityColor = (priorityName: string | null): "default" | "error" | "warning" | "info" => {
        if (!priorityName) return "default";
        const lowerPriority = priorityName.toLowerCase();
        if (lowerPriority.includes('high') || lowerPriority.includes('גבוה')) return "error";
        if (lowerPriority.includes('medium') || lowerPriority.includes('בינוני')) return "warning";
        if (lowerPriority.includes('low') || lowerPriority.includes('נמוך')) return "info";
        return "default";
    };

    // פורמט תאריך
    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error" variant="filled">
                    שגיאה בטעינת פרטי הטיקט: {error}
                </Alert>
            </Container>
        );
    }

    if (!selectedTicket) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="warning" variant="filled">
                    הטיקט לא נמצא
                </Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Header Card */}
                <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
                    <Stack spacing={3}>
                        {/* Title Row */}
                        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
                            <Stack direction="row" alignItems="center" spacing={2} flex={1}>
                                <TicketIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                <Box flex={1}>
                                    <Typography variant="caption" color="text.secondary" gutterBottom>
                                        טיקט #{selectedTicket.id}
                                    </Typography>
                                    <Typography variant="h4" fontWeight={700} color="text.primary">
                                        {selectedTicket.subject}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Stack direction="row" spacing={1.5}>
                                <Chip 
                                    icon={<FlagIcon />}
                                    label={selectedTicket.priority_name || 'ללא'}
                                    color={getPriorityColor(selectedTicket.priority_name)}
                                    sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                                />
                                <Chip 
                                    label={selectedTicket.status_name || 'לא ידוע'}
                                    color={getStatusColor(selectedTicket.status_name)}
                                    sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                                />
                            </Stack>
                        </Stack>

                        <Divider />

                        {/* Description */}
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                <DescriptionIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    תיאור הבעיה
                                </Typography>
                            </Stack>
                            <Paper 
                                elevation={0}
                                sx={{ 
                                    p: 3, 
                                    bgcolor: 'background.default',
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'divider'
                                }}
                            >
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                                    {selectedTicket.description}
                                </Typography>
                            </Paper>
                        </Box>

                        <Divider />

                        {/* Compact Info Row */}
                        <Stack 
                            direction={{ xs: 'column', md: 'row' }} 
                            spacing={3}
                            sx={{ 
                                bgcolor: 'background.default',
                                p: 2,
                                borderRadius: 2
                            }}
                        >
                            {/* Created By */}
                            <Stack direction="row" alignItems="center" spacing={2} flex={1}>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                                    <PersonIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        נוצר על ידי
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {selectedTicket.created_by_name}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {selectedTicket.created_by_email}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Divider orientation="vertical" flexItem />

                            {/* Assigned To */}
                            <Stack direction="row" alignItems="center" spacing={2} flex={1}>
                                <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48 }}>
                                    {selectedTicket.assigned_to_name ? selectedTicket.assigned_to_name.charAt(0) : '?'}
                                </Avatar>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        מוקצה ל
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {selectedTicket.assigned_to_name || 'לא שויך'}
                                    </Typography>
                                    {selectedTicket.assigned_to_email && (
                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                            <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                            <Typography variant="caption" color="text.secondary">
                                                {selectedTicket.assigned_to_email}
                                            </Typography>
                                        </Stack>
                                    )}
                                </Box>
                            </Stack>

                            <Divider orientation="vertical" flexItem />

                            {/* Dates */}
                            <Stack spacing={1.5} flex={1}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <TimeIcon sx={{ fontSize: 20, color: 'info.main' }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            תאריך יצירה
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {formatDate(selectedTicket.created_at)}
                                        </Typography>
                                    </Box>
                                </Stack>
                                {selectedTicket.updated_at && (
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <TimeIcon sx={{ fontSize: 20, color: 'warning.main' }} />
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                עודכן לאחרונה
                                            </Typography>
                                            <Typography variant="body2" fontWeight={600}>
                                                {formatDate(selectedTicket.updated_at)}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>

                {/* Actions Section */}
                {(role === 'admin' || role === 'agent' || role === 'customer') && (
                    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                            פעולות ניהול
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            {role === 'agent' && <AgentAction/>}
                            {role === 'admin' && <AdminAction idT={Number(id)} />}
                            {(role === 'admin' || role === 'agent') && <ChangeStatus idT={Number(id)}/>}
                            {role === 'customer' && <CustomerAction/>}
                        </Stack>
                    </Paper>
                )}

                {/* Comments Section */}
                <CommentList ticketId={Number(id)} />
                
                {/* Add Comment */}
                {(role === 'customer' || role === 'agent') && <AddComment ticketId={Number(id)} />}
            </Container>
        </Box>
    );
}




    