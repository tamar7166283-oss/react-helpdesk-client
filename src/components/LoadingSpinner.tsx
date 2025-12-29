import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
    message?: string;
    size?: number;
}

export default function LoadingSpinner({ message = 'טוען...', size = 60 }: LoadingSpinnerProps) {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                gap: 2
            }}
        >
            <CircularProgress size={size} thickness={4} />
            <Typography variant="h6" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
}