import type { Ticket } from "../types/tickets";
import {
    Box,
    Paper,
    Typography,
    Divider
} from '@mui/material';

interface AgentDashboardProps {
    tickets: Ticket[];
    userId: number;
}

export const AgentDashboard = ({ tickets, userId }: AgentDashboardProps) => {
    const myTickets = tickets.filter(t => t.assigned_to === userId);
    
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
            {/* Total Assigned */}
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
                    סה״כ טיקטים משוייכים אליי
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
                        אין טיקטים משוייכים אליך
                    </Typography>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {statusStats.map((stat) => (
                            <Box 
                                key={stat.label}
                                sx={{ 
                                    flex: '1 1 calc(25% - 16px)',
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
        </Box>
    );
};

export default AgentDashboard;