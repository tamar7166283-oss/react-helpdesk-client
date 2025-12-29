
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { AdminDashboard } from "../components/AdminDashboard";
import { useEffect } from "react";
import { fetchUsers } from "../store/usersSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { getTickets } from "../store/ticketsSlice";
import { AgentDashboard } from "../components/AgentDashboard";
import { CustomerDashboard } from "../components/CustomerDashboard";
import { Box, Container, Typography, Alert } from '@mui/material';
import { Block as BlockIcon } from '@mui/icons-material';

export const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const { tickets, loading: ticketsLoading } = useSelector((state: RootState) => state.tickets);
    const { users, loading: usersLoading } = useSelector((state: RootState) => state.users);
    useEffect(() => {
        dispatch(getTickets());
        dispatch(fetchUsers());
    }, [dispatch]);

    if (!user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3 }}>
                <Alert severity="error" icon={<BlockIcon />} sx={{ maxWidth: 500 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>גישה חסומה</Typography>
                    <Typography variant="body2">נא להתחבר למערכת</Typography>
                </Alert>
            </Box>
        );
    }

    if ((ticketsLoading || usersLoading) && tickets.length === 0) {
        return <LoadingSpinner message="טוען נתוני לוח הבקרה..." />;
    }

    return (
        <Box dir="rtl" sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
            {/* Gradient Accent Line */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    zIndex: 1100
                }}
            />

            <Container maxWidth="lg" sx={{ py: 3, pt: 5 }}>
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                    <Typography 
                        variant="h5" 
                        fontWeight={700} 
                        sx={{ 
                            color: '#2d3748',
                            mb: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        👋 שלום, {user.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#718096' }}>
                        {user.role === 'admin' && 'לוח בקרה - מנהל מערכת'}
                        {user.role === 'agent' && 'לוח בקרה - סוכן תמיכה'}
                        {user.role === 'customer' && 'לוח בקרה - מרכז התמיכה שלי'}
                    </Typography>
                </Box>

                {user.role === 'admin' && (
                    <AdminDashboard tickets={tickets} users={users}/>
                )}

                {user.role === 'agent' && (
                    <AgentDashboard tickets={tickets} userId={user.id} />
                )}

                {user.role === 'customer' && (
                    <CustomerDashboard tickets={tickets} userId={user.id} />
                )}
            </Container>
        </Box>
    );
};

export default Dashboard;



