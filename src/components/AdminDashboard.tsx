import type { Ticket } from "../types/tickets";
import type User from "../types/users";
import {
    Box,
    Paper,
    Typography,
    Stack,
    Divider
} from '@mui/material';
import {
    ConfirmationNumber as TicketIcon,
    Group as GroupIcon,
    AssignmentLate as UnassignedIcon
} from '@mui/icons-material';

interface AdminDashboardProps {
    tickets: Ticket[]; 
    users: User[]; 
}

export const AdminDashboard = ({ tickets, users}: AdminDashboardProps) => {

    const agents = users.filter(u => u.role === 'agent');
    const agentWorkload = agents.map(agent => ({
        name: agent.name,
        count: tickets.filter(t => t.assigned_to === agent.id && t.status_name !== 'Closed').length
    }));


    const statusGroups = tickets.reduce((acc, ticket) => {
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


    const generalStats = [
        { label: 'סה"כ פניות במערכת', value: tickets.length, icon: <TicketIcon />, color: '#667eea' },
        { label: 'ללא סוכן מוקצה', value: tickets.filter(t => !t.assigned_to).length, icon: <UnassignedIcon />, color: '#ef4444' }
    ];

    return (
        <Box>
            {/* General Statistics */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                {generalStats.map((stat, index) => (
                    <Box key={index} sx={{ flex: '1 1 calc(50% - 12px)', minWidth: '250px' }}>
                        <Paper
                            elevation={1}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                border: '1px solid #e2e8f0',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    boxShadow: 2
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="h3" fontWeight={700} sx={{ color: stat.color }}>
                                        {stat.value}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 2,
                                        bgcolor: `${stat.color}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: stat.color
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                ))}
            </Box>

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
            </Paper>

            {/* Agent Workload */}
            <Paper 
                elevation={1} 
                sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid #e2e8f0'
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <GroupIcon sx={{ color: '#667eea' }} />
                    <Typography variant="h6" fontWeight={600} sx={{ color: '#2d3748' }}>
                        עומס סוכנים
                    </Typography>
                </Stack>

                <Divider sx={{ mb: 2 }} />

                {agentWorkload.length === 0 ? (
                    <Typography variant="body2" sx={{ color: '#718096', textAlign: 'center', py: 2 }}>
                        אין סוכנים במערכת
                    </Typography>
                ) : (
                    <Stack spacing={1.5}>
                        {agentWorkload.map(a => (
                            <Box 
                                key={a.name}
                                sx={{ 
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: '#f9fafb',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: '#f3f4f6'
                                    }
                                }}
                            >
                                <Typography variant="body1" fontWeight={500} sx={{ color: '#2d3748' }}>
                                    {a.name}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    fontWeight={600}
                                    sx={{ 
                                        color: a.count > 5 ? '#ef4444' : a.count > 2 ? '#f59e0b' : '#10b981',
                                        bgcolor: a.count > 5 ? '#fef2f2' : a.count > 2 ? '#fffbeb' : '#f0fdf4',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 1
                                    }}
                                >
                                    {a.count} טיקטים פתוחים
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Paper>
        </Box>
    );
};