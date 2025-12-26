import { useState } from 'react';
import { setCredentials } from '../store/authSlice';
import {useForm} from 'react-hook-form';
import { AxiosError } from 'axios';
import authService from '../services/authService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './authPages.css';
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
import { PersonAdd, Email, Lock, Person } from '@mui/icons-material';

export interface LocationState {
    from?: {
        pathname: string;
    };
}

interface FormValue {
    name: string;
    email: string;
    password: string;
}

export default function SignupPage() {
    const {register, handleSubmit, formState: { errors }} = useForm<FormValue>();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const typedstate  = location.state as LocationState;
    const destinationPath = typedstate?.from?.pathname || "/dashboard";

    const onRegister = async (data: {name:string; email:string; password:string;}) => {
         setError("");
         setLoading(true);
       try{
        const response = await authService.register(data.email, data.password, data.name);
        dispatch(setCredentials(response));
        navigate(destinationPath, { replace: true });
       }
       catch(error){
        if(error instanceof AxiosError) {
            setError(error.response?.data?.message);
       }
        else {
        setError("Local JavaScript error"+(error as Error).message);
       }
    }
    finally {
        setLoading(false);}
    };

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
                            <PersonAdd sx={{ fontSize: 48 }} />
                        </Box>
                        <Typography variant="h4" className="auth-title">
                            הרשמה למערכת
                        </Typography>
                        <Typography variant="body1" className="auth-subtitle">
                            צור חשבון חדש במערכת Helpdesk
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" className="auth-error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit(onRegister)} className="auth-form">
                        <TextField
                            fullWidth
                            id="name"
                            label="שם מלא"
                            type="text"
                            disabled={loading}
                            {...register('name', { required: "שם מלא נדרש" })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            className="form-input"
                        />

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
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
                        >
                            {loading ? 'יוצר חשבון...' : 'הירשם'}
                        </Button>
                    </Box>

                    <Box className="auth-footer">
                        <Typography variant="body2" color="text.secondary">
                            כבר יש לך חשבון?
                        </Typography>
                        <Link to="/login" state={{from:typedstate?.from}} className="auth-link">
                            התחבר כאן
                        </Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}


