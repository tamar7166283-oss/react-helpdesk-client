import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useDispatch } from 'react-redux';
import { setCredentials} from '../store/authSlice';
import { AxiosError } from 'axios';
import type { LocationState } from './SignupPage';
import './authPages.css';
import { useForm } from 'react-hook-form';
import { 
    Box, 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Paper, 
    Alert,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import { Email, Lock, Login as LoginIcon } from '@mui/icons-material';

interface FormValue {
    email: string;
    password: string;
}


export default function LoginPage() {
    const {register, handleSubmit, formState: { errors }} = useForm<FormValue>();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const typedstate  = location.state as LocationState;    
    const destinationPath  = typedstate?.from?.pathname || "/dashboard";

    const onLogin =async (data: FormValue) => {
       setError("");
       setLoading(true);
       try{
        const response = await authService.login(data.email, data.password);
        console.log("Login successful:", response);
        dispatch(setCredentials(response));
        navigate(destinationPath,{ replace: true });
       }
       catch(error){
        if(error instanceof AxiosError) {
            setError(error.response?.data?.message);
       }  else {
        setError("Login failed");
       }
    } finally {
        setLoading(false);
    }
}

    return(
        <Box className="auth-container">
            <Box className="auth-background">
                <Box className="shape shape-1" />
                <Box className="shape shape-2" />
                <Box className="shape shape-3" />
            </Box>
            
            <Container maxWidth="sm">
                <Paper elevation={10} className="auth-card">
                    <Box className="auth-header">
                        <Box className="auth-icon">
                            <LoginIcon sx={{ fontSize: 48 }} />
                        </Box>
                        <Typography variant="h4" className="auth-title">
                            התחברות למערכת
                        </Typography>
                        <Typography variant="body1" className="auth-subtitle">
                            מערכת Helpdesk לניהול פניות
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" className="auth-error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit(onLogin)} className="auth-form">
                        <TextField
                            fullWidth
                            id="email"
                            label="כתובת אימייל"
                            type="email"
                            disabled={loading}
                            {...register('email', { 
                                required: "כתובת אימייל נדרשת",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "כתובת אימייל לא תקינה"
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            className="form-input"
                        />

                        <TextField
                            fullWidth
                            id="password"
                            label="סיסמה"
                            type="password"
                            disabled={loading}
                            {...register('password', { required: "סיסמה נדרשת" })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            className="form-input"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            className="auth-button"
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                        >
                            {loading ? 'מתחבר...' : 'התחבר'}
                        </Button>
                    </Box>

                    <Box className="auth-footer">
                        <Typography variant="body2" color="text.secondary">
                            אין לך חשבון?
                        </Typography>
                        <Link to="/signup" state={{from:typedstate?.from}} className="auth-link">
                            הירשם עכשיו
                        </Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}


