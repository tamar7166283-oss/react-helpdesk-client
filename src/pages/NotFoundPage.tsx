import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Stack
} from '@mui/material';
import {
    SearchOff as SearchOffIcon,
    ArrowForward as ArrowIcon
} from '@mui/icons-material';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <Box
            dir="rtl"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#fafbfc',
                fontFamily: '"Assistant", "Roboto", sans-serif'
            }}
        >
            <Stack
                spacing={3}
                alignItems="center"
                sx={{
                    textAlign: 'center',
                    maxWidth: '500px',
                    px: 3
                }}
            >
                {/* Icon */}
                <SearchOffIcon
                    sx={{
                        fontSize: 80,
                        color: 'text.disabled',
                        opacity: 0.5
                    }}
                />

                {/* 404 Number */}
                <Typography
                    variant="h1"
                    fontWeight={700}
                    sx={{
                        fontSize: { xs: '5rem', sm: '7rem' },
                        color: 'text.secondary',
                        lineHeight: 1,
                        letterSpacing: '-0.02em'
                    }}
                >
                    404
                </Typography>

                {/* Title */}
                <Typography
                    variant="h5"
                    fontWeight={600}
                    color="text.primary"
                    sx={{ mt: -1 }}
                >
                    הדף לא נמצא
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        maxWidth: '400px',
                        lineHeight: 1.6
                    }}
                >
                    הדף שחיפשת אינו קיים או שהוסר. בדוק את הכתובת או חזור לדף הבית.
                </Typography>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ mt: 2, width: '100%', justifyContent: 'center' }}
                >
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/dashboard')}
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            py: 1.2,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            borderColor: 'divider',
                            color: 'text.primary',
                            '&:hover': {
                                borderColor: 'primary.main',
                                bgcolor: 'rgba(102, 126, 234, 0.04)'
                            }
                        }}
                    >
                        חזרה לדף הבית
                    </Button>

                    <Button
                        variant="text"
                        size="large"
                        endIcon={<ArrowIcon sx={{ transform: 'rotate(180deg)' }} />}
                        onClick={() => navigate(-1)}
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            py: 1.2,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: 'text.secondary',
                            '&:hover': {
                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        חזור אחורה
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
