import { useNavigate } from "react-router-dom";
import type { Ticket } from "../types/tickets";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Chip,
    Stack,
    Divider,
    Button,
    Box
} from '@mui/material';
import {
    Flag as FlagIcon
} from '@mui/icons-material';
import { formatDate, getPriorityColor, getStatusColor } from '../GlobalFunctions/forStyle';

interface TicketCardProps {
    ticket: Ticket;
    showButton?: boolean;
    buttonText?: string;
    buttonAction?: (ticketId: number) => void;
}

export const TicketCard = ({ 
    ticket, 
    showButton = false, 
    buttonText = 'צפה בפרטים',
    buttonAction 
}: TicketCardProps) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (buttonAction) {
            buttonAction(ticket.id);
        } else {
            navigate(`/tickets/${ticket.id}`);
        }
    };

    const isActionRequired = ticket.status_name !== 'Closed';

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                bgcolor: isActionRequired ? 'rgba(239, 246, 255, 0.4)' : 'white',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-2px)'
                },
                '&::before': isActionRequired ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                } : {}
            }}
        >
            <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <FlagIcon 
                                sx={{ 
                                    fontSize: 18, 
                                    color: getPriorityColor(ticket.priority_name || 'Medium')
                                }} 
                            />
                            <Typography variant="h6" fontWeight={600} sx={{ color: '#2d3748', fontSize: '1rem' }}>
                                #{ticket.id} - {ticket.subject}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#718096' }}>
                            {ticket.description?.substring(0, 100)}
                            {ticket.description && ticket.description.length > 100 ? '...' : ''}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={ticket.status_name}
                            size="small"
                            sx={{
                                bgcolor: getStatusColor(ticket.status_name),
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem'
                            }}
                        />
                        <Chip
                            label={ticket.priority_name || 'Medium'}
                            size="small"
                            sx={{
                                bgcolor: `${getPriorityColor(ticket.priority_name || 'Medium')}20`,
                                color: getPriorityColor(ticket.priority_name || 'Medium'),
                                fontWeight: 600,
                                fontSize: '0.7rem'
                            }}
                        />
                    </Stack>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Stack direction="row" spacing={2}>
                    <Typography variant="caption" sx={{ color: '#a0aec0' }}>
                        📅 נוצר: {formatDate(ticket.created_at)}
                    </Typography>
                    {ticket.updated_at && ticket.updated_at !== ticket.created_at && (
                        <Typography variant="caption" sx={{ color: '#a0aec0' }}>
                            🔄 עודכן: {formatDate(ticket.updated_at)}
                        </Typography>
                    )}
                </Stack>
            </CardContent>

            {showButton && (
                <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleButtonClick}
                        sx={{ 
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 2,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                            }
                        }}
                    >
                        {buttonText}
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};

export default TicketCard;
