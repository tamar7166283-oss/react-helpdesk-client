export const getPriorityColor = (priority: string | null): string => {
    if (!priority) return '#94a3b8';
    const lower = priority.toLowerCase();
    if (lower.includes('high') || lower.includes('גבוה')) return '#ef4444';
    if (lower.includes('medium') || lower.includes('בינוני')) return '#f59e0b';
    if (lower.includes('low') || lower.includes('נמוך')) return '#3b82f6';
    return '#94a3b8';
};

export const getStatusColor = (status: string | null): string => {
    if (!status) return '#94a3b8';
    const lower = status.toLowerCase();
    if (lower.includes('open') || lower.includes('פתוח')) return '#3b82f6';
    if (lower.includes('progress') || lower.includes('בטיפול')) return '#f59e0b';
    if (lower.includes('closed') || lower.includes('סגור')) return '#10b981';
    if (lower.includes('resolved') || lower.includes('נפתר')) return '#10b981';
    return '#94a3b8';
};

export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'לא ידוע';
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Format date for divider
export  const formatDateDivider = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'היום';
            }
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            if (date.toDateString() === today.toDateString()) {
                return 'היום';
            } else if (date.toDateString() === yesterday.toDateString()) {
                return 'אתמול';
            } else {
                return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' });
            }
        } catch {
            return 'היום';
        }
    };



