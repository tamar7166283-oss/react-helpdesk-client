import Swal from 'sweetalert2';

// Toast להודעות הצלחה קצרות
export const showSuccessToast = (title: string, text?: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: 'swal-rtl-toast'
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return Toast.fire({
        icon: 'success',
        title,
        text
    });
};

// Alert שגיאה גנרי
export const showErrorAlert = (title: string, text: string) => {
    return Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonText: 'אישור',
        confirmButtonColor: '#667eea',
        backdrop: true,
        customClass: {
            popup: 'swal-rtl'
        }
    });
};

// Alert אזהרה עם אישור
export const showWarningConfirm = (title: string, text: string, confirmText = 'כן, המשך') => {
    return Swal.fire({
        icon: 'warning',
        title,
        text,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: 'ביטול',
        confirmButtonColor: '#ed6c02',
        cancelButtonColor: '#718096',
        backdrop: true,
        customClass: {
            popup: 'swal-rtl'
        }
    });
};

// Alert מידע
export const showInfoAlert = (title: string, text: string) => {
    return Swal.fire({
        icon: 'info',
        title,
        text,
        confirmButtonText: 'הבנתי',
        confirmButtonColor: '#667eea',
        backdrop: true,
        customClass: {
            popup: 'swal-rtl'
        }
    });
};

// הודעות שגיאה נפוצות
export const COMMON_ERRORS = {
    NETWORK_ERROR: 'בעיית תקשורת. אנא בדוק את החיבור לאינטרנט ונסה שוב',
    UNAUTHORIZED: 'אין לך הרשאה לבצע פעולה זו',
    SERVER_ERROR: 'אירעה שגיאה בשרת. אנא נסה שוב מאוחר יותר',
    VALIDATION_ERROR: 'אחד או יותר מהשדות אינם תקינים',
    UNKNOWN_ERROR: 'אירעה שגיאה לא צפויה. אנא נסה שוב'
};

// Toast להודעת מידע
export const showInfoToast = (title: string, text?: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            popup: 'swal-rtl-toast'
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return Toast.fire({
        icon: 'info',
        title,
        text
    });
};

// Toast להודעת אזהרה
export const showWarningToast = (title: string, text?: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        customClass: {
            popup: 'swal-rtl-toast'
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return Toast.fire({
        icon: 'warning',
        title,
        text
    });
};
