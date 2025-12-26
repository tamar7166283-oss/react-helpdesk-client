import { useDispatch, useSelector } from "react-redux";
import { fetchStatuses, updateTicket } from "../store/ticketsSlice";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import type { TicketStatus } from "../types/tickets";
import Swal from 'sweetalert2';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Box,
    Chip
} from '@mui/material';
import { Flag as FlagIcon } from '@mui/icons-material';
interface ChangeStatusProps{
    idT:number
}
export function ChangeStatus({idT}: ChangeStatusProps) { 
    const dispatch = useDispatch<AppDispatch>();
    const {selectedTicket, statuses, statusLoading, loading, updateLoading} = useSelector((state:RootState) => state.tickets);

    const handleStatusChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const statusId = Number(event.target.value);
        const selectedStatus = statuses.find(status => status.id === statusId);
        
        if (!selectedStatus) return;

        // הצגת אישור עם SweetAlert
        const result = await Swal.fire({
            title: 'שינוי סטטוס',
            html: `לשנות את הסטטוס ל<strong>${selectedStatus.name}</strong>?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#667eea',
            cancelButtonColor: '#d33',
            confirmButtonText: 'כן, שנה!',
            cancelButtonText: 'ביטול',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                await dispatch(updateTicket({id:idT, data: {status_id: statusId}})).unwrap();
                
                // הודעת הצלחה
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: `הסטטוס עודכן ל-${selectedStatus.name}`,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            } catch (error) {
                // הודעת שגיאה
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה!',
                    text: 'לא ניתן לעדכן את הסטטוס. נסה שוב.',
                    confirmButtonColor: '#667eea'
                });
            }
        }
    };

    useEffect(()=>{
        if(statuses.length===0&&!statusLoading)
        dispatch(fetchStatuses());
    },[dispatch,statusLoading,statuses.length])

    // פונקציה להחזרת צבע סטטוס
    const getStatusColor = (statusName: string): "default" | "primary" | "success" | "warning" | "error" => {
        const lowerStatus = statusName.toLowerCase();
        if (lowerStatus.includes('open') || lowerStatus.includes('פתוח')) return "primary";
        if (lowerStatus.includes('closed') || lowerStatus.includes('סגור')) return "default";
        if (lowerStatus.includes('progress') || lowerStatus.includes('בטיפול')) return "warning";
        if (lowerStatus.includes('resolved') || lowerStatus.includes('נפתר')) return "success";
        return "default";
    };

    if(!selectedTicket||loading){
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    return(
        <FormControl 
            fullWidth 
            variant="outlined"
            disabled={updateLoading}
            sx={{ minWidth: 250 }}
        >
            <InputLabel id="change-status-label">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlagIcon fontSize="small" />
                    שנה סטטוס
                </Box>
            </InputLabel>
            <Select
                labelId="change-status-label"
                value={selectedTicket.status_id || ""}
                onChange={handleStatusChange}
                label="שנה סטטוס"
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 2,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                    }
                }}
            >
                <MenuItem value="" disabled>
                    <em>— שנה סטטוס —</em>
                </MenuItem>
                {statuses.map((status: TicketStatus) => (
                    <MenuItem key={status.id} value={status.id}>
                        <Chip 
                            label={status.name} 
                            size="small"
                            color={getStatusColor(status.name)}
                            sx={{ fontWeight: 600 }}
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default ChangeStatus;


 
 


  