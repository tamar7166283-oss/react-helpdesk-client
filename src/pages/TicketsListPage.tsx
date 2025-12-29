import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTickets, clearError}  from '../store/ticketsSlice';
import type { Ticket } from '../types/tickets';
import {type AppDispatch, type RootState } from '../store';
import { NavLink, useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import { showErrorAlert } from '../utils/sweetAlertUtils';
import { formatDate,getPriorityColor,getStatusColor } from '../GlobalFunctions/forStyle';
import {
    Box,
    Container,
    Stack,
    Typography,
    Card,
    CardContent,
    Chip,
    Fab,
    Tooltip,
    Paper
} from '@mui/material';
import {
    ConfirmationNumber as TicketIcon,
    AccessTime as TimeIcon,
    Add as AddIcon,
    Flag as FlagIcon,
    NotificationsActive as AlertIcon
} from '@mui/icons-material';

export default function TicketsListPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {tickets,loading,error}= useSelector((state: RootState) => state.tickets);
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const navigate= useNavigate();

    useEffect(() => {
        if(tickets.length === 0)
        dispatch(getTickets());
    }, [dispatch]);

    // טיפול בשגיאות עם Alert
    useEffect(() => {
        if (error) {
            showErrorAlert('שגיאה בטעינת כרטיסים', error).then(() => {
                dispatch(clearError());
            });
        }
    }, [error, dispatch]);

    if (loading) {
        return <LoadingSpinner message='טוען טיקטים...' />;
    }
    if (tickets.length === 0) {
        return <EmptyState message="אין טיקטים להצגה כרגע." fullHeight={true} />;
    }
    
    return (
        <Box 
            dir="rtl"
            sx={{ 
                bgcolor: '#f9fafb',
                minHeight: '100vh', 
                py: 4,
                fontFamily: '"Assistant", "Roboto", sans-serif'
            }}
        >
            {/* Accent Line */}
            <Box 
                sx={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    zIndex: 1000
                }}
            />

            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ mb: 4, textAlign: 'right' }}>
                    <Stack 
                        direction="row" 
                        alignItems="center" 
                        spacing={2} 
                        sx={{ mb: 1, justifyContent: 'flex-start' }}
                    >
                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: '10px',
                                p: 1.2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.12)'
                            }}
                        >
                            <TicketIcon sx={{ fontSize: 28, color: 'primary.main' }} />
                        </Box>
                        <Typography 
                            variant="h4" 
                            fontWeight={700} 
                            sx={{ color: '#2d3748' }}
                        >
                            מרכז פניות
                        </Typography>
                    </Stack>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            fontWeight: 500, 
                            pr: 7,
                            color: '#718096'
                        }}
                    >
                        {role === 'admin' && 'ניהול כלל הפניות במערכת'}
                        {role === 'agent' && 'הפניות הפתוחות לטיפולך'}
                        {role === 'customer' && 'מעקב אחר הפניות שפתחת'}
                    </Typography>
                </Box>

                {/* Tickets List Container */}
                <Paper 
                    elevation={1} 
                    sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 3, color: '#2d3748' }}>
                        📋 רשימת פניות ({tickets.length})
                    </Typography>

                    <Stack spacing={2.5}>
                        {tickets.map((ticket: Ticket) => {
                        const isAdminAlert = role === 'admin' && !ticket.assigned_to;
                        const isAgentActionRequired = role === 'agent' && ticket.status_name !== 'Closed';
                        const isCustomerActionRequired = role === 'customer' && ticket.status_name !== 'Closed';
                    
                        return (
                            <Card 
                                key={ticket.id}
                                component={NavLink}
                                to={`/tickets/${ticket.id}`}
                                elevation={0}
                                sx={{
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    borderRadius: '10px',
                                    bgcolor: 'white',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        transform: 'translateY(-2px)'
                                    },
                                    '&::before': (isAdminAlert || isAgentActionRequired || isCustomerActionRequired) ? {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: '4px',
                                        height: '100%',
                                        background: isAdminAlert 
                                            ? 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)' 
                                            : 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                                    } : {}
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', minHeight: '70px' }}>
                                        
                                        {/* Right Column - Date & ID */}
                                        <Box sx={{ 
                                            minWidth: '110px', 
                                            flexShrink: 0,
                                            pr: 2,
                                            borderLeft: '1px solid #e2e8f0'
                                        }}>
                                            <Typography 
                                                variant="subtitle2" 
                                                fontWeight={700}
                                                sx={{ 
                                                    color: '#4a5568',
                                                    fontSize: '0.875rem',
                                                    mb: 0.8
                                                }}
                                            >
                                                #{ticket.id}
                                            </Typography>
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <TimeIcon sx={{ fontSize: 14, color: '#a0aec0' }} />
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: '#a0aec0',
                                                        fontSize: '0.7rem',
                                                        fontWeight: 500,
                                                        lineHeight: 1.4
                                                    }}
                                                >
                                                    {formatDate(ticket.updated_at || ticket.created_at)}
                                                </Typography>
                                            </Stack>
                                        </Box>

                                        {/* Center Left Column - Subject & Description */}
                                        <Box sx={{ flex: 1, minWidth: 0, textAlign: 'right', px: 1 }}>
                                            <Typography 
                                                variant="h6" 
                                                fontWeight={600}
                                                sx={{ 
                                                    fontSize: '1rem',
                                                    lineHeight: 1.4,
                                                    color: '#2d3748',
                                                    mb: 0.7
                                                }}
                                            >
                                                {ticket.subject}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    lineHeight: 1.5,
                                                    fontSize: '0.85rem',
                                                    color: '#718096'
                                                }}
                                            >
                                                {ticket.description}
                                            </Typography>
                                        </Box>

                                        {/* Center Right Column - Status & Priority */}
                                        <Box sx={{ 
                                            minWidth: '130px', 
                                            flexShrink: 0,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: 1
                                        }}>
                                            <Chip 
                                                label={ticket.status_name} 
                                                size="small"
                                                sx={{ 
                                                    bgcolor: getStatusColor(ticket.status_name),
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    fontSize: '0.7rem',
                                                    height: 24,
                                                    minWidth: 60
                                                }} 
                                            />
                                            <Chip 
                                                icon={<FlagIcon sx={{ fontSize: 13 }} />}
                                                label={ticket.priority_name} 
                                                size="small"
                                                sx={{ 
                                                    bgcolor: `${getPriorityColor(ticket.priority_name)}20`,
                                                    color: getPriorityColor(ticket.priority_name),
                                                    fontWeight: 600,
                                                    fontSize: '0.7rem',
                                                    height: 24,
                                                    minWidth: 60,
                                                    '& .MuiChip-icon': {
                                                        color: 'inherit',
                                                        fontSize: 13
                                                    }
                                                }} 
                                            />
                                        </Box>

                                        {/* Left Column - Agent Name (Admin Only) */}
                                        {role === 'admin' && (
                                            <Box sx={{ 
                                                minWidth: '120px', 
                                                flexShrink: 0,
                                                textAlign: 'left',
                                                pl: 2,
                                                borderRight: '1px solid #e2e8f0'
                                            }}>
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        color: '#a0aec0',
                                                        fontSize: '0.65rem',
                                                        display: 'block',
                                                        mb: 0.3
                                                    }}
                                                >
                                                    מטפל
                                                </Typography>
                                                <Typography 
                                                    variant="body2" 
                                                    fontWeight={600}
                                                    sx={{ 
                                                        fontSize: '0.8rem',
                                                        color: ticket.assigned_to_name ? '#2d3748' : '#ef4444'
                                                    }}
                                                >
                                                    {ticket.assigned_to_name || 'לא משויך'}
                                                </Typography>
                                            </Box>
                                        )}

                                    </Box>
                                </CardContent>

                                {isAdminAlert && (
                                    <Tooltip title="ממתין להקצאה - דורש טיפול מיידי!" placement="top" arrow>
                                        <Box sx={{ 
                                            position: 'absolute', 
                                            top: 12, 
                                            left: 12,
                                            color: 'error.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                                            '@keyframes pulse': {
                                                '0%, 100%': { opacity: 1 },
                                                '50%': { opacity: 0.5 }
                                            }
                                        }}>
                                            <AlertIcon sx={{ fontSize: 20 }} />
                                        </Box>
                                    </Tooltip>
                                )}
                            </Card>
                        );
                    })}
                </Stack>
                </Paper>

                {/* Floating Action Button - Customer Only */}
                {role === 'customer' && (
                    <Tooltip title="פתח פנייה חדשה" placement="top" arrow>
                        <Fab 
                            color="primary" 
                            onClick={() => navigate('/tickets/new')}
                            sx={{ 
                                position: 'fixed', 
                                bottom: 32, 
                                right: 32,
                                width: 64,
                                height: 64,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.45)'
                                }
                            }}
                        >
                            <AddIcon sx={{ fontSize: 30 }} />
                        </Fab>
                    </Tooltip>
                )}
            </Container>
        </Box>
    );
}