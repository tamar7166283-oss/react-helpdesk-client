import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/usersSlice";
import { type RootState, type AppDispatch } from "../store";
import { CreateUser } from "../components/CreateUser";
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Avatar,
    Stack,
    Divider
} from '@mui/material';
import {
    AdminPanelSettings as AdminIcon,
    SupportAgent as AgentIcon,
    PersonOutline as CustomerIcon
} from '@mui/icons-material';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export const UsersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const { users, loading } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const getRoleIcon = (role: string) => {
        if (role === 'admin') return <AdminIcon sx={{ fontSize: 18 }} />;
        if (role === 'agent') return <AgentIcon sx={{ fontSize: 18 }} />;
        return <CustomerIcon sx={{ fontSize: 18 }} />;
    };

    const getRoleLabel = (role: string) => {
        if (role === 'admin') return 'מנהל מערכת';
        if (role === 'agent') return 'סוכן תמיכה';
        return 'לקוח';
    };

    const getRoleColor = (role: string) => {
        if (role === 'admin') return { bg: '#fef2f2', color: '#dc2626' };
        if (role === 'agent') return { bg: '#eff6ff', color: '#2563eb' };
        return { bg: '#f0fdf4', color: '#16a34a' };
    };

    if (loading) return <LoadingSpinner message="טוען רשימת משתמשים..."/>;

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#2d3748', mb: 1 }}>
                    👥 ניהול משתמשים
                </Typography>
                <Typography variant="body2" sx={{ color: '#718096' }}>
                    צפייה וניהול כל המשתמשים במערכת
                </Typography>
            </Box>

            {/* Stats */}
            <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ mb: 4 }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                        סה״כ משתמשים
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#667eea' }}>
                        {users.length}
                    </Typography>
                </Paper>

                <Paper
                    elevation={1}
                    sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                        מנהלי מערכת
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#dc2626' }}>
                        {users.filter(u => u.role === 'admin').length}
                    </Typography>
                </Paper>

                <Paper
                    elevation={1}
                    sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                        סוכני תמיכה
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#2563eb' }}>
                        {users.filter(u => u.role === 'agent').length}
                    </Typography>
                </Paper>

                <Paper
                    elevation={1}
                    sx={{
                        flex: 1,
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid #e2e8f0'
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                        לקוחות
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#16a34a' }}>
                        {users.filter(u => u.role === 'customer').length}
                    </Typography>
                </Paper>
            </Stack>

            {/* Create User Section */}
            <Paper
                elevation={1}
                sx={{
                    mb: 4,
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ px: 3, pt: 3, pb: 2 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ color: '#2d3748' }}>
                        ➕ הוסף משתמש חדש
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 3 }}>
                    <CreateUser />
                </Box>
            </Paper>

            {/* Users Table */}
            <Paper
                elevation={1}
                sx={{
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ p: 3, pb: 2 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ color: '#2d3748' }}>
                        📋 רשימת משתמשים
                    </Typography>
                </Box>

                <Divider />

                {users.length === 0 ? (
                    <Box sx={{ p: 4 }}>
                        <EmptyState message="לא נמצאו משתמשים במערכת" />
                    </Box>
                ) : (
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table sx={{ minWidth: 650 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell 
                                        align="right"
                                        sx={{ 
                                            fontWeight: 600, 
                                            color: '#4a5568',
                                            fontSize: '0.875rem',
                                            bgcolor: '#f9fafb'
                                        }}
                                    >
                                        משתמש
                                    </TableCell>
                                    <TableCell 
                                        align="right"
                                        sx={{ 
                                            fontWeight: 600, 
                                            color: '#4a5568',
                                            fontSize: '0.875rem',
                                            bgcolor: '#f9fafb'
                                        }}
                                    >
                                        אימייל
                                    </TableCell>
                                    <TableCell 
                                        align="right"
                                        sx={{ 
                                            fontWeight: 600, 
                                            color: '#4a5568',
                                            fontSize: '0.875rem',
                                            bgcolor: '#f9fafb',
                                            display: { xs: 'none', md: 'table-cell' }
                                        }}
                                    >
                                        תפקיד
                                    </TableCell>
                                    <TableCell 
                                        align="right"
                                        sx={{ 
                                            fontWeight: 600, 
                                            color: '#4a5568',
                                            fontSize: '0.875rem',
                                            bgcolor: '#f9fafb',
                                            display: { xs: 'none', sm: 'table-cell' }
                                        }}
                                    >
                                        מזהה
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.filter(user => user && user.name && user.email).map((user) => {
                                    const roleColors = getRoleColor(user.role);
                                    return (
                                        <TableRow
                                            key={user.id}
                                            sx={{
                                                '&:hover': {
                                                    bgcolor: '#f9fafb'
                                                },
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <TableCell align="right">
                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                                                    <Box sx={{ textAlign: 'right' }}>
                                                        <Typography 
                                                            variant="body2" 
                                                            fontWeight={600}
                                                            sx={{ color: '#2d3748' }}
                                                        >
                                                            {user.name}
                                                        </Typography>
                                                        {/* Role chip on mobile */}
                                                        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 0.5 }}>
                                                            <Chip
                                                                icon={getRoleIcon(user.role)}
                                                                label={getRoleLabel(user.role)}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: roleColors.bg,
                                                                    color: roleColors.color,
                                                                    fontWeight: 600,
                                                                    '& .MuiChip-icon': {
                                                                        color: roleColors.color,
                                                                        mr: 0.5
                                                                    }
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Avatar
                                                        sx={{
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                            width: 40,
                                                            height: 40,
                                                            fontWeight: 700,
                                                            fontSize: '1rem'
                                                        }}
                                                    >
                                                        {user.name?.charAt(0)?.toUpperCase() || '?'}
                                                    </Avatar>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography 
                                                    variant="body2" 
                                                    sx={{ 
                                                        color: '#718096',
                                                        wordBreak: 'break-word'
                                                    }}
                                                >
                                                    {user.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                                <Chip
                                                    icon={getRoleIcon(user.role)}
                                                    label={getRoleLabel(user.role)}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: roleColors.bg,
                                                        color: roleColors.color,
                                                        fontWeight: 600,
                                                        '& .MuiChip-icon': {
                                                            color: roleColors.color,
                                                            mr: 0.5
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                                <Typography 
                                                    variant="body2" 
                                                    sx={{ 
                                                        color: '#a0aec0',
                                                        fontFamily: 'monospace',
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    #{user.id}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
};

export default UsersPage;