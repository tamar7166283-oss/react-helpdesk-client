import { Box, Typography, Stack, Link } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                mt: 6,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderTop: '3px solid #5a67d8',
                boxShadow: '0 -4px 20px rgba(102, 126, 234, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }
            }}
        >
            <Stack spacing={2.5} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Main copyright with heart */}
                <Stack 
                    direction="row" 
                    spacing={1} 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: 600
                        }}
                    >
                        &copy; {new Date().getFullYear()} Helpdesk System
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.9rem',
                            mx: 0.5
                        }}
                    >
                        •
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: '0.9rem'
                        }}
                    >
                        Made with
                    </Typography>
                    <FavoriteIcon 
                        sx={{ 
                            fontSize: 16, 
                            color: '#ff6b6b',
                            animation: 'pulse 1.5s ease-in-out infinite',
                            '@keyframes pulse': {
                                '0%, 100%': { transform: 'scale(1)' },
                                '50%': { transform: 'scale(1.15)' }
                            }
                        }} 
                    />
                </Stack>

                {/* Links */}
                <Stack 
                    direction="row" 
                    spacing={3} 
                    divider={
                        <Typography sx={{ color: 'rgba(255,255,255,0.3)' }}>
                            |
                        </Typography>
                    }
                >
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                            '&:hover': {
                                color: 'white',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        מדיניות פרטיות
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                            '&:hover': {
                                color: 'white',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        תנאי שימוש
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                            '&:hover': {
                                color: 'white',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        נגישות
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                            '&:hover': {
                                color: 'white',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        צור קשר
                    </Link>
                </Stack>

                {/* All rights reserved */}
                <Typography 
                    variant="caption" 
                    sx={{ 
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.75rem',
                        fontWeight: 500
                    }}
                >
                    כל הזכויות שמורות
                </Typography>
            </Stack>
        </Box>
    );
}
