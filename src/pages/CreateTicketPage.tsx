import {useForm} from 'react-hook-form';
import {createTicket} from '../store/ticketsSlice';
import {type CreateTicketDto} from '../types/tickets';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {type AppDispatch } from '../store';
import type { RootState } from '../store';
import { showSuccessToast, showErrorAlert } from '../utils/sweetAlertUtils';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    Stack,
    CircularProgress
} from '@mui/material';
import {
    AddCircleOutline as AddIcon,
    Subject as SubjectIcon,
    Description as DescriptionIcon
} from '@mui/icons-material';

export interface TicketFormValue {
    subject: string;
    description: string;
}

export default function CreateTicketPage() {
    const {register, handleSubmit, formState: { errors }} = useForm<TicketFormValue>();
    const {loading, error} = useSelector((state: RootState) => state.tickets);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

const onSubmit=async (data: TicketFormValue) => {
    const finalData: CreateTicketDto = { 
        status_id: 1,
        priority_id: 1,
        assigned_to: null,
        ...data};
    
     const result = await dispatch(createTicket(finalData));
     if (createTicket.rejected.match(result)) {
        showErrorAlert('שגיאה ביצירת פניה', 'אירעה שגיאה ביצירת הפניה. אנא נסה שוב.');
    }
    if (createTicket.fulfilled.match(result)) {
        showSuccessToast('פניה נשלחה בהצלחה!', 'הפניה שלך התקבלה ותטופל בהקדם');
        
        // המתן רגע ואז נווט
        setTimeout(() => {
            navigate("/tickets");
        }, 1500);
    }
};
    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 3 }}>
            <Container maxWidth="sm">
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                    {/* Header */}
                    <Box sx={{ mb: 3, textAlign: 'center' }}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 56,
                                height: 56,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                mb: 1.5,
                                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)'
                            }}
                        >
                            <AddIcon sx={{ fontSize: 32 }} />
                        </Box>
                        <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
                            צור פניה חדשה
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            מלא את הפרטים למעקב אחר הבעיה שלך
                        </Typography>
                    </Box>

                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Form */}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={3}>
                            {/* Subject Field */}
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                    <SubjectIcon color="primary" />
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        נושא הפניה
                                    </Typography>
                                </Stack>
                                <TextField
                                    fullWidth
                                    id="subject"
                                    placeholder="לדוגמה: בעיה בהתחברות למערכת"
                                    disabled={loading}
                                    {...register('subject', { required: "נושא הפניה הוא שדה חובה" })}
                                    error={!!errors.subject}
                                    helperText={errors.subject?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
                                            },
                                            '&.Mui-focused': {
                                                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            {/* Description Field */}
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                    <DescriptionIcon color="primary" />
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        תיאור מפורט
                                    </Typography>
                                </Stack>
                                <TextField
                                    fullWidth
                                    id="description"
                                    placeholder="תאר את הבעיה בפירוט..."
                                    multiline
                                    rows={6}
                                    disabled={loading}
                                    {...register('description', { required: "תיאור הפניה הוא שדה חובה" })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
                                            },
                                            '&.Mui-focused': {
                                                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="medium"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AddIcon />}
                                sx={{
                                    borderRadius: 2,
                                    padding: '12px',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    boxShadow: '0 6px 18px rgba(102, 126, 234, 0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                                    },
                                    '&:active': {
                                        transform: 'translateY(0)'
                                    }
                                }}
                            >
                                {loading ? 'שולח פניה...' : 'שלח פניה'}
                            </Button>

                            {/* Cancel Button */}
                            <Button
                                fullWidth
                                variant="outlined"
                                size="medium"
                                disabled={loading}
                                onClick={() => navigate('/tickets')}
                                sx={{
                                    borderRadius: 2,
                                    padding: '10px',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    '&:hover': {
                                        borderColor: 'primary.dark',
                                        bgcolor: 'rgba(102, 126, 234, 0.04)'
                                    }
                                }}
                            >
                                ביטול
                            </Button>
                        </Stack>
                    </Box>
                </Paper>

                {/* Info Box */}
                <Paper
                    elevation={0}
                    sx={{
                        mt: 2,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'info.light',
                        border: '1px solid',
                        borderColor: 'info.main'
                    }}
                >
                    <Typography variant="caption" color="info.dark" sx={{ fontWeight: 500 }}>
                        💡 <strong>טיפ:</strong> ככל שהתיאור יהיה מפורט יותר, כך נוכל לטפל בבעיה שלך מהר יותר!
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );

}
