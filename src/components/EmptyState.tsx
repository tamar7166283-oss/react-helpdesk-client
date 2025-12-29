import { Box, Typography} from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

interface EmptyStateProps {
    message?: string;
    fullHeight?: boolean;
}

export default function EmptyState({ message = 'אין נתונים להצגה', fullHeight = false }: EmptyStateProps) {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: fullHeight ? '100vh' : '300px',
                gap: 3,
                p: 3
            }}
        >
            <InboxOutlined sx={{ fontSize: 120, color: 'text.disabled' }} />
            <Typography variant="h5" color="text.secondary" textAlign="center">
                {message}
            </Typography>
        </Box>
    );
}