import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser as createUserThunk, clearError } from "../store/usersSlice";
import { type AppDispatch, type RootState } from "../store";
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    FormHelperText,
    CircularProgress
} from '@mui/material';
import {
    PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { showErrorAlert, showSuccessToast } from "../utils/sweetAlertUtils";

interface UserFormValue {
    name: string;
    email: string;
    password: string;
    role: string;
}

export const CreateUser = () => {
    const { loading } = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<UserFormValue>({
        defaultValues: {
            role: 'customer'
        }
    });

    const onSubmit = async (data: UserFormValue) => {
        try {
            await dispatch(createUserThunk(data)).unwrap();
            reset();
            showSuccessToast('המשתמש נוצר בהצלחה!');
        } catch (error: any) {
            // טיפול בשגיאות - ההודעה תגיע מהשרת דרך ה-API interceptor
            let errorTitle = 'שגיאה ביצירת משתמש';
            let errorMessage = error?.message || 'אירעה שגיאה ביצירת המשתמש';
            
            // התאמת הכותרת לפי סוג השגיאה
            if (errorMessage.includes('email') || errorMessage.includes('duplicate') || errorMessage.includes('already exists') || errorMessage.includes('קיים')) {
                errorTitle = 'אימייל כבר קיים';
            }
            
            await showErrorAlert(errorTitle, errorMessage);
            // ניקוי השגיאה מה-state אחרי הצגת ה-Alert
            dispatch(clearError());
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            dir="rtl"
        >
            <Stack spacing={3}>
                {/* All fields in one row */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        label="שם מלא"
                        {...register("name", { required: "שם הוא שדה חובה" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'grey.50',
                                '& fieldset': {
                                    borderColor: 'divider',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    borderWidth: '2px'
                                }
                            },
                            '& .MuiInputLabel-root': {
                                right: 14,
                                left: 'unset',
                                transformOrigin: 'top right',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            },
                            '& .MuiInputBase-input': {
                                textAlign: 'right',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            }
                        }}
                    />

                    <TextField
                        label="אימייל"
                        type="email"
                        {...register("email", { required: "אימייל הוא שדה חובה" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'grey.50',
                                '& fieldset': {
                                    borderColor: 'divider',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    borderWidth: '2px'
                                }
                            },
                            '& .MuiInputLabel-root': {
                                right: 14,
                                left: 'unset',
                                transformOrigin: 'top right',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            },
                            '& .MuiInputBase-input': {
                                textAlign: 'right',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            }
                        }}
                    />

                    <TextField
                        label="סיסמה"
                        type="password"
                        {...register("password", { required: "סיסמה היא שדה חובה" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{
                            flex: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: 'grey.50',
                                '& fieldset': {
                                    borderColor: 'divider',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                    borderWidth: '2px'
                                }
                            },
                            '& .MuiInputLabel-root': {
                                right: 14,
                                left: 'unset',
                                transformOrigin: 'top right',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            },
                            '& .MuiInputBase-input': {
                                textAlign: 'right',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            }
                        }}
                    />

                    <Controller
                        name="role"
                        control={control}
                        defaultValue="customer"
                        rules={{ required: "תפקיד הוא שדה חובה" }}
                        render={({ field }) => (
                            <FormControl 
                                error={!!errors.role}
                                sx={{ flex: 1 }}
                            >
                                <InputLabel 
                                    id="role-label"
                                    sx={{ 
                                        right: 14,
                                        left: 'unset',
                                        transformOrigin: 'top right',
                                        fontFamily: '"Assistant", "Roboto", sans-serif',
                                        '&.MuiInputLabel-shrink': {
                                            transform: 'translate(0, -9px) scale(0.75)'
                                        }
                                    }}
                                >
                                    תפקיד
                                </InputLabel>
                                <Select
                                    {...field}
                                    labelId="role-label"
                                    label="תפקיד"
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: 'grey.50',
                                        '& fieldset': {
                                            borderColor: 'divider',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'primary.main',
                                            borderWidth: '2px'
                                        },
                                        '& .MuiSelect-select': {
                                            textAlign: 'right',
                                            fontFamily: '"Assistant", "Roboto", sans-serif'
                                        }
                                    }}
                                >
                                    <MenuItem value="customer" sx={{ direction: 'rtl', justifyContent: 'flex-end' }}>
                                        לקוח
                                    </MenuItem>
                                    <MenuItem value="agent" sx={{ direction: 'rtl', justifyContent: 'flex-end' }}>
                                        סוכן תמיכה
                                    </MenuItem>
                                    <MenuItem value="admin" sx={{ direction: 'rtl', justifyContent: 'flex-end' }}>
                                        מנהל מערכת
                                    </MenuItem>
                                </Select>
                                {errors.role && (
                                    <FormHelperText sx={{ textAlign: 'right' }}>
                                        {errors.role.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </Stack>

                {/* Submit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                        sx={{
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #5568d3 0%, #6a4292 100%)',
                                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                                transform: 'translateY(-2px)'
                            },
                            '&:disabled': {
                                background: '#cbd5e0'
                            }
                        }}
                    >
                        {loading ? 'יוצר משתמש...' : 'צור משתמש חדש'}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}

export default CreateUser;