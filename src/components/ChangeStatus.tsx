import { useDispatch, useSelector } from "react-redux";
import { fetchStatuses, updateTicket } from "../store/ticketsSlice";
import type { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import type { TicketStatus } from "../types/tickets";
import { showSuccessToast } from '../utils/sweetAlertUtils';
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Typography
} from '@mui/material';
import { SyncAlt as StatusIcon } from '@mui/icons-material';

interface ChangeStatusProps{
    idT:number
}

export function ChangeStatus({idT}: ChangeStatusProps) { 
    const dispatch = useDispatch<AppDispatch>();
    const {selectedTicket, statuses, statusLoading, loading, updateLoading} = useSelector((state:RootState) => state.tickets);

    const handleAssign = async (event: any) => {
        const newStatusId = Number(event.target.value);
        const newStatus = statuses.find(s => s.id === newStatusId);
        
        const result = await dispatch(updateTicket({id:idT, data: {status_id: newStatusId}}));
        
        if (updateTicket.fulfilled.match(result) && newStatus?.name === 'Closed') {
            showSuccessToast('הסטטוס עודכן', 'הטיקט סומן כסגור בהצלחה');
        }
    };

    useEffect(() => {
        if(statuses.length === 0 && !statusLoading)
            dispatch(fetchStatuses());
    }, [dispatch, statusLoading, statuses.length]);

    if(!selectedTicket || loading){
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2" color="text.secondary">טוען...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ flex: 1 }}>
            <FormControl fullWidth>
                <InputLabel 
                    id="status-select-label"
                    sx={{ 
                        right: '14px !important',
                        left: 'unset !important',
                        transformOrigin: 'top right !important',
                        fontFamily: '"Assistant", "Roboto", sans-serif',
                        '&.MuiInputLabel-shrink': {
                            transform: 'translate(0, -9px) scale(0.75) !important'
                        }
                    }}
                >
                    שינוי סטטוס
                </InputLabel>
                <Select
                    labelId="status-select-label"
                    value={selectedTicket.status_id || ""}
                    onChange={handleAssign}
                    disabled={updateLoading}
                    label="שינוי סטטוס"
                    startAdornment={<StatusIcon sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />}
                    sx={{
                        minHeight: '56px !important',
                        borderRadius: '8px !important',
                        bgcolor: '#f9fafb !important',
                        fontFamily: '"Assistant", "Roboto", sans-serif',
                        '& fieldset': {
                            borderColor: '#e2e8f0 !important',
                        },
                        '&:hover fieldset': {
                            borderColor: '#667eea !important',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#667eea !important',
                            borderWidth: '2px !important'
                        },
                        '& .MuiSelect-select': {
                            textAlign: 'right !important',
                            padding: '16px 14px !important',
                            display: 'flex !important',
                            alignItems: 'center !important'
                        }
                    }}
                >
                    {statuses.map((status: TicketStatus) => (
                        <MenuItem 
                            key={status.id} 
                            value={status.id} 
                            sx={{ 
                                justifyContent: 'flex-end',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            }}
                        >
                            {status.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default ChangeStatus;