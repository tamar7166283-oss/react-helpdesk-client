import { useNavigate } from "react-router-dom";
import type { Ticket } from "../types/tickets";
import {
    Box,
    Paper,
    Typography,
    Button,
    Divider
} from '@mui/material';
import {
    Add as AddIcon
} from '@mui/icons-material';

interface CustomerDashboardProps {
    tickets: Ticket[];
    userId: number;
}

export const CustomerDashboard = ({ tickets, userId }: CustomerDashboardProps) => {
    const navigate = useNavigate();
    const myTickets = tickets.filter(t => t.created_by === userId);
    
    const statusGroups = myTickets.reduce((acc, ticket) => {
        const status = ticket.status_name || 'Unknown';
        if (!acc[status]) {
            acc[status] = 0;
        }
        acc[status]++;
        return acc;
    }, {} as Record<string, number>);

    const statusStats = Object.entries(statusGroups).map(([status, count]) => ({
        label: status,
        value: count
    }));

    return (
        <Box>
            {/* Total Tickets */}
            <Paper 
                elevation={1} 
                sx={{ 
                    p: 3, 
                    mb: 4,
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                }}
            >
                <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                    סה״כ פניות שלי
                </Typography>
                <Typography variant="h3" fontWeight={700} sx={{ color: '#667eea' }}>
                    {myTickets.length}
                </Typography>
            </Paper>

            {/* Status Breakdown */}
            <Paper 
                elevation={1} 
                sx={{ 
                    p: 3, 
                    mb: 4,
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                }}
            >
                <Typography variant="h6" fontWeight={600} sx={{ color: '#2d3748', mb: 2 }}>
                    📊 פילוח לפי סטטוס
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {statusStats.length === 0 ? (
                    <Typography variant="body2" sx={{ color: '#718096', textAlign: 'center', py: 2 }}>
                        עדיין לא יצרת פניות
                    </Typography>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {statusStats.map((stat) => (
                            <Box 
                                key={stat.label}
                                sx={{ 
                                    flex: '1 1 calc(33.333% - 16px)',
                                    minWidth: '150px',
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: '#f9fafb',
                                    border: '1px solid #e2e8f0',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: '#f3f4f6',
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                                    {stat.label}
                                </Typography>
                                <Typography variant="h4" fontWeight={700} sx={{ color: '#667eea' }}>
                                    {stat.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>

            {/* Quick Action */}
            <Paper 
                elevation={1} 
                sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: 2, 
                    border: '1px solid #e2e8f0',
                    textAlign: 'center' 
                }}
            >
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#2d3748' }}>
                    צריך עזרה? פתח פנייה חדשה
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/tickets/new')}
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontWeight: 600,
                        fontSize: '1rem'
                    }}
                >
                    פתיחת פנייה חדשה למוקד
                </Button>
            </Paper>
        </Box>
    );
};

export default CustomerDashboard;