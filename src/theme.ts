import { createTheme } from '@mui/material/styles';

// Helpdesk Theme - עיצוב אחיד לכל האפליקציה
export const helpdeskTheme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#667eea',
            light: '#8c9eff',
            dark: '#4d63d8',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#764ba2',
            light: '#9b6fc7',
            dark: '#5a3679',
            contrastText: '#ffffff',
        },
        error: {
            main: '#fc6b6b',
            light: '#ff8585',
            dark: '#d95555',
        },
        warning: {
            main: '#ffb74d',
            light: '#ffc947',
            dark: '#ff9800',
        },
        success: {
            main: '#4caf50',
            light: '#66bb6a',
            dark: '#388e3c',
        },
        info: {
            main: '#29b6f6',
            light: '#4fc3f7',
            dark: '#0288d1',
        },
        background: {
            default: '#f7fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a202c',
            secondary: '#718096',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 2px 4px rgba(0,0,0,0.05)',
        '0 4px 8px rgba(0,0,0,0.05)',
        '0 8px 16px rgba(0,0,0,0.05)',
        '0 12px 24px rgba(0,0,0,0.05)',
        '0 16px 32px rgba(0,0,0,0.08)',
        '0 20px 40px rgba(0,0,0,0.08)',
        '0 24px 48px rgba(0,0,0,0.1)',
        '0 28px 56px rgba(0,0,0,0.1)',
        '0 32px 64px rgba(0,0,0,0.12)',
        '0 20px 60px rgba(0,0,0,0.3)',
        '0 24px 64px rgba(0,0,0,0.3)',
        '0 28px 68px rgba(0,0,0,0.3)',
        '0 32px 72px rgba(0,0,0,0.3)',
        '0 36px 76px rgba(0,0,0,0.3)',
        '0 40px 80px rgba(0,0,0,0.3)',
        '0 44px 84px rgba(0,0,0,0.3)',
        '0 48px 88px rgba(0,0,0,0.3)',
        '0 52px 92px rgba(0,0,0,0.3)',
        '0 56px 96px rgba(0,0,0,0.3)',
        '0 60px 100px rgba(0,0,0,0.3)',
        '0 64px 104px rgba(0,0,0,0.3)',
        '0 68px 108px rgba(0,0,0,0.3)',
        '0 72px 112px rgba(0,0,0,0.3)',
        '0 76px 116px rgba(0,0,0,0.3)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '10px 24px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5568d3 0%, #653a8a 100%)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        '& fieldset': {
                            borderWidth: 2,
                        },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                },
                elevation2: {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                },
                elevation3: {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});
