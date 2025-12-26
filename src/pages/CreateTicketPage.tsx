import {useForm} from 'react-hook-form';
import {createTicket} from '../store/ticketsSlice';
import {type CreateTicketDto} from '../types/tickets';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {type AppDispatch } from '../store';
import type { RootState } from '../store';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    ConfirmationNumber as TicketIcon,
    Send as SendIcon,
    Description as DescriptionIcon
} from '@mui/icons-material';
import Swal from 'sweetalert2';
export interface TicketFormValue {
    subject: string;
    description: string;
}

export default function CreateTicketPage() {
    const {register, handleSubmit, formState: { errors }, reset} = useForm<TicketFormValue>();
    const {loading, error} = useSelector((state: RootState) => state.tickets);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (data: TicketFormValue) => {
        const finalData: CreateTicketDto = { 
            status_id: 1,
            priority_id: 1,
            assigned_to: null,
            ...data
        };
        
        try {
            await dispatch(createTicket(finalData)).unwrap();
            
            await Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'הטיקט נוצר בהצלחה!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
            
            reset();
            navigate("/tickets");
        } catch (err) {
            await Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'שגיאה ביצירת הטיקט',
                text: err instanceof Error ? err.message : 'אנא נסה שוב',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            });
        }
    };

    return (
        <Box 
            sx={{ 
                bgcolor: 'background.default', 
                minHeight: '100vh',
                py: 6,
                backgroundImage: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
            }}
        >
            <Container maxWidth="md">
                <Paper 
                    elevation={6} 
                    sx={{ 
                        p: { xs: 3, md: 5 }, 
                        borderRadius: 4,
                        background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)'
                    }}
                >
                    {/* Header */}
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
                        <Box
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                width: 60,
                                height: 60,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
                            }}
                        >
                            <TicketIcon sx={{ fontSize: 36 }} />
                        </Box>
                        <Box>
                            <Typography variant="h4" fontWeight={700} color="text.primary">
                                פתיחת טיקט חדש
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                מלא את הפרטים למטה ונחזור אליך בהקדם
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Global Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={3}>
                            {/* Subject Field */}
                            <Box>
                                <TextField
                                    id="subject"
                                    label="נושא הפניה"
                                    fullWidth
                                    {...register('subject', { 
                                        required: "נושא הוא שדה חובה",
                                        minLength: { value: 5, message: "הנושא חייב להכיל לפחות 5 תווים" }
                                    })}
                                    error={!!errors.subject}
                                    helperText={errors.subject?.message}
                                    placeholder="למשל: בעיה בהתחברות למערכת"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            '&:hover': {
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'primary.main'
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            {/* Description Field */}
                            <Box>
                                <TextField
                                    id="description"
                                    label="תיאור מפורט"
                                    fullWidth
                                    multiline
                                    rows={8}
                                    {...register('description', { 
                                        required: "תיאור הוא שדה חובה",
                                        minLength: { value: 10, message: "התיאור חייב להכיל לפחות 10 תווים" }
                                    })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message || "תאר את הבעיה בפירוט רב ככל האפשר"}
                                    placeholder="תאר את הבעיה או השאלה שלך בפירוט..."
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            '&:hover': {
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'primary.main'
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            {/* Info Box */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    bgcolor: 'info.lighter',
                                    border: '1px solid',
                                    borderColor: 'info.light',
                                    borderRadius: 2
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <DescriptionIcon sx={{ color: 'info.main', fontSize: 20 }} />
                                    <Typography variant="body2" color="info.dark">
                                        הטיקט ישויך אוטומטית לנציג זמין ויטופל בהקדם האפשרי
                                    </Typography>
                                </Stack>
                            </Paper>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #5568d3 30%, #63408a 90%)',
                                        boxShadow: '0 6px 25px rgba(102, 126, 234, 0.5)',
                                        transform: 'translateY(-2px)'
                                    },
                                    '&:disabled': {
                                        background: 'linear-gradient(45deg, #667eea70 30%, #764ba270 90%)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {loading ? 'יוצר טיקט...' : 'שלח פניה'}
                            </Button>

                            {/* Cancel Button */}
                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                onClick={() => navigate('/tickets')}
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    borderWidth: 2,
                                    '&:hover': {
                                        borderWidth: 2,
                                        bgcolor: 'action.hover'
                                    }
                                }}
                            >
                                ביטול
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}
