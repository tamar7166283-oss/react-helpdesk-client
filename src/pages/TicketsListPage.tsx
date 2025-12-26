import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTickets}  from '../store/ticketsSlice';
import type { Ticket } from '../types/tickets';
import {type AppDispatch, type RootState } from '../store';
import { NavLink, useNavigate } from 'react-router-dom';
import './ticketsStyles.css';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Chip,
    Stack,
    CircularProgress,
    Alert,
    Fab,
    Paper,
    Avatar,
    Divider
} from '@mui/material';
import {
    Add as AddIcon,
    ConfirmationNumber as TicketIcon,
    Schedule as TimeIcon,
    Flag as FlagIcon
} from '@mui/icons-material';

export default function TicketsListPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {tickets,loading,error}= useSelector((state: RootState) => state.tickets);
    const role = useSelector((state: RootState) => state.auth.user?.role);

    const navigate= useNavigate();

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

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
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error" variant="filled">
                    שגיאה בטעינת הטיקטים: {error}
                </Alert>
            </Container>
        );
    }

    if (tickets.length === 0) {
        return (
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: 6, 
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        borderRadius: 4
                    }}
                >
                    <TicketIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" gutterBottom color="text.secondary">
                        אין טיקטים זמינים
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {role === 'customer' ? 'התחל על ידי יצירת טיקט חדש' : 'לא נמצאו טיקטים במערכת'}
                    </Typography>
                    {role === 'customer' && (
                        <Fab 
                            color="primary" 
                            variant="extended" 
                            onClick={() => navigate('/tickets/new')}
                            sx={{ 
                                boxShadow: 3,
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.3s ease'
                                }
                            }}
                        >
                            <AddIcon sx={{ mr: 1 }} />
                            צור טיקט חדש
                        </Fab>
                    )}
                </Paper>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <TicketIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="h3" fontWeight={700} color="primary">
                            הטיקטים שלי
                        </Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary">
                        {role === 'admin' && 'כל הטיקטים במערכת'}
                        {role === 'agent' && 'הטיקטים שהוקצו אליך'}
                        {role === 'customer' && 'הטיקטים שפתחת'}
                    </Typography>
                </Box>

                {/* Tickets List - רשימה אנכית */}
                <Stack spacing={2}>
                    {tickets.map((ticket: Ticket) => (
                        <Card 
                            key={ticket.id}
                            component={NavLink}
                            to={`/tickets/${ticket.id}`}
                            sx={{
                                display: 'flex',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateX(-8px)',
                                    boxShadow: 4,
                                    bgcolor: 'action.hover'
                                },
                                position: 'relative',
                                overflow: 'visible',
                                borderRight: '4px solid',
                                borderRightColor: 'primary.main'
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Stack direction="row" alignItems="center" spacing={3} sx={{ width: '100%' }}>
                                    {/* Right side - Priority & Status */}
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Chip 
                                            icon={<FlagIcon />}
                                            label={ticket.priority_name || 'ללא'}
                                            color={getPriorityColor(ticket.priority_name)}
                                            size="small"
                                        />
                                        <Chip 
                                            label={ticket.status_name || 'לא ידוע'}
                                            color={getStatusColor(ticket.status_name)}
                                            size="small"
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </Stack>

                                    {/* Center - Main content */}
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                            <Typography variant="caption" color="text.secondary">
                                                טיקט #{ticket.id}
                                            </Typography>
                                            <Divider orientation="vertical" flexItem />
                                            <Typography 
                                                variant="h6" 
                                                fontWeight={600}
                                                sx={{ 
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    color: 'text.primary'
                                                }}
                                            >
                                                {ticket.subject}
                                            </Typography>
                                        </Stack>

                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                            sx={{ 
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {ticket.description}
                                        </Typography>
                                    </Box>

                                    {/* Left side - User & Date */}
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        {ticket.assigned_to_name && (
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Avatar 
                                                    sx={{ 
                                                        width: 32, 
                                                        height: 32, 
                                                        bgcolor: 'primary.main',
                                                        fontSize: 14 
                                                    }}
                                                >
                                                    {ticket.assigned_to_name.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="caption" color="text.secondary" display="block">
                                                        מוקצה ל
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {ticket.assigned_to_name}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        )}

                                        <Stack alignItems="flex-end" spacing={0.5}>
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <TimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatDate(ticket.updated_at || ticket.created_at)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                {/* Floating Action Button */}
                {role === 'customer' && (
                    <Fab 
                        color="primary" 
                        aria-label="add"
                        onClick={() => navigate('/tickets/new')}
                        sx={{
                            position: 'fixed',
                            bottom: 32,
                            left: 32,
                            boxShadow: 4,
                            '&:hover': {
                                transform: 'scale(1.1)',
                                transition: 'transform 0.3s ease'
                            }
                        }}
                    >
                        <AddIcon />
                    </Fab>
                )}
            </Container>
        </Box>
    );
}
