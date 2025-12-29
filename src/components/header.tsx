import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../store/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { showWarningConfirm, showSuccessToast } from '../utils/sweetAlertUtils';
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Avatar,
    Stack,
    Menu,
    MenuItem,
    Divider,
    IconButton,
    Box
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    ConfirmationNumber as TicketIcon,
    AddCircle as AddIcon,
    People as UsersIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';


export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector((state:RootState)=>state.auth.user?.name);
    const role = useSelector((state:RootState)=>state.auth.user?.role);
    
    // State for profile menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleCloseMenu();
        
        const result = await showWarningConfirm(
            'האם אתה בטוח?',
            'האם ברצונך להתנתק מהמערכת?',
            'כן, התנתק'
        );
        
        if (result.isConfirmed) {
            dispatch(logout());
            showSuccessToast('התנתקת בהצלחה', 'להתראות!');
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1000);
        }
    };

    const getRoleLabel = (role: string | undefined) => {
        if (role === 'admin') return 'מנהל מערכת';
        if (role === 'agent') return 'סוכן תמיכה';
        return 'לקוח';
    };
     return (
        <AppBar 
            position="sticky" 
            sx={{ 
                background: 'linear-gradient(135deg, #f8f9ff 0%, #fefaff 50%, #f8f9fa 100%)',
                color: '#2d3748',
                boxShadow: '0 2px 12px rgba(102, 126, 234, 0.08)',
                borderBottom: '2px solid transparent',
                borderImage: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%) 1',
                backdropFilter: 'blur(10px)'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
                {/* Logo - Clickable */}
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={1.5}
                    onClick={() => navigate('/dashboard')}
                    sx={{ 
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                        '&:hover': { opacity: 0.7 }
                    }}
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 2.5,
                            p: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        <TicketIcon sx={{ fontSize: 26, color: 'white' }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ color: '#2d3748', lineHeight: 1.2 }}>
                            Helpdesk
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#667eea', fontWeight: 600, fontSize: '0.7rem' }}>
                            Support System
                        </Typography>
                    </Box>
                </Stack>

                {/* Navigation */}
                <Stack direction="row" spacing={0.5}>
                    <Button
                        component={NavLink}
                        to="/dashboard"
                        startIcon={<DashboardIcon />}
                        sx={{
                            color: '#4a5568',
                            borderRadius: 2,
                            px: 2.5,
                            py: 1,
                            fontWeight: 500,
                            position: 'relative',
                            '&.active': { 
                                bgcolor: 'white',
                                color: '#667eea',
                                fontWeight: 600,
                                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)',
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -2,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60%',
                                    height: 3,
                                    bgcolor: '#667eea',
                                    borderRadius: '3px 3px 0 0'
                                }
                            },
                            '&:hover': {
                                bgcolor: 'white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                            }
                        }}
                    >
                        דף הבית
                    </Button>

                    <Button
                        component={NavLink}
                        to="/tickets"
                        startIcon={<TicketIcon />}
                        sx={{
                            color: '#4a5568',
                            borderRadius: 2,
                            px: 2.5,
                            py: 1,
                            fontWeight: 500,
                            position: 'relative',
                            '&.active': { 
                                bgcolor: 'white',
                                color: '#667eea',
                                fontWeight: 600,
                                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)',
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -2,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60%',
                                    height: 3,
                                    bgcolor: '#667eea',
                                    borderRadius: '3px 3px 0 0'
                                }
                            },
                            '&:hover': {
                                bgcolor: 'white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                            }
                        }}
                    >
                        טיקטים
                    </Button>

                    {role === 'customer' && (
                        <Button
                            component={NavLink}
                            to="/tickets/new"
                            startIcon={<AddIcon />}
                            sx={{
                                color: '#4a5568',
                                borderRadius: 2,
                                px: 2.5,
                                py: 1,
                                fontWeight: 500,
                                position: 'relative',
                                '&.active': { 
                                    bgcolor: 'white',
                                    color: '#667eea',
                                    fontWeight: 600,
                                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)',
                                    '&:after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -2,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '60%',
                                        height: 3,
                                        bgcolor: '#667eea',
                                        borderRadius: '3px 3px 0 0'
                                    }
                                },
                                '&:hover': {
                                    bgcolor: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                }
                            }}
                        >
                            טיקט חדש
                        </Button>
                    )}

                    {role === 'admin' && (
                        <Button
                            component={NavLink}
                            to="/users"
                            startIcon={<UsersIcon />}
                            sx={{
                                color: '#4a5568',
                                borderRadius: 2,
                                px: 2.5,
                                py: 1,
                                fontWeight: 500,
                                position: 'relative',
                                '&.active': { 
                                    bgcolor: 'white',
                                    color: '#667eea',
                                    fontWeight: 600,
                                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)',
                                    '&:after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -2,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '60%',
                                        height: 3,
                                        bgcolor: '#667eea',
                                        borderRadius: '3px 3px 0 0'
                                    }
                                },
                                '&:hover': {
                                    bgcolor: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                }
                            }}
                        >
                            משתמשים
                        </Button>
                    )}
                </Stack>

                {/* User Profile Menu */}
                <Box>
                    <IconButton
                        onClick={handleOpenMenu}
                        sx={{ 
                            p: 0.5,
                            transition: 'all 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        <Avatar 
                            sx={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                width: 40,
                                height: 40,
                                fontWeight: 700,
                                border: '2px solid #e2e8f0'
                            }}
                        >
                            {userName?.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        PaperProps={{
                            elevation: 3,
                            sx: {
                                mt: 1.5,
                                minWidth: 220,
                                borderRadius: 2,
                                overflow: 'visible',
                                border: '1px solid #e2e8f0',
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    borderTop: '1px solid #e2e8f0',
                                    borderLeft: '1px solid #e2e8f0'
                                }
                            }
                        }}
                    >
                        {/* User Info */}
                        <Box sx={{ px: 2, py: 1.5, textAlign: 'right' }}>
                            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="flex-end">
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#2d3748' }}>
                                        {userName}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#718096' }}>
                                        {getRoleLabel(role)}
                                    </Typography>
                                </Box>
                                <Avatar 
                                    sx={{ 
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        width: 36,
                                        height: 36,
                                        fontWeight: 700
                                    }}
                                >
                                    {userName?.charAt(0).toUpperCase()}
                                </Avatar>
                            </Stack>
                        </Box>

                        <Divider />

                        {/* Logout */}
                        <MenuItem 
                            onClick={handleLogout}
                            sx={{ 
                                py: 1.5,
                                px: 2,
                                gap: 1.5,
                                justifyContent: 'flex-end',
                                '&:hover': {
                                    bgcolor: '#fef2f2',
                                    '& .MuiTypography-root': {
                                        color: '#dc2626'
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: '#dc2626'
                                    }
                                }
                            }}
                        >
                            <Typography variant="body2" fontWeight={500}>
                                התנתק
                            </Typography>
                            <LogoutIcon fontSize="small" />
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}