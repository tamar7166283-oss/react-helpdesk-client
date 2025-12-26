import { useSelector,useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import type User from "../types/users"
import { updateTicket } from "../store/ticketsSlice"
import { useEffect } from "react"
import { fetchUsers } from "../store/usersSlice"
import Swal from 'sweetalert2'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Box,
    Chip
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

interface AdminActionProps{
    idT:number
}

export function AdminAction({idT}: AdminActionProps){ 
    const dispatch = useDispatch<AppDispatch>();

    const handleAssign = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const agentId = Number(event.target.value);
        const selectedAgent = agents.find(agent => agent.id === agentId);
        
        if (!selectedAgent) return;

        // הצגת אישור עם SweetAlert
        const result = await Swal.fire({
            title: 'האם אתה בטוח?',
            html: `להקצות טיקט זה ל<strong>${selectedAgent.name}</strong>?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#667eea',
            cancelButtonColor: '#d33',
            confirmButtonText: 'כן, הקצה!',
            cancelButtonText: 'ביטול',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                await dispatch(updateTicket({id:idT, data: {assigned_to: agentId}})).unwrap();
                
                // הודעת הצלחה
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: `הטיקט הוקצה ל-${selectedAgent.name}`,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            } catch (error) {
                // הודעת שגיאה
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה!',
                    text: 'לא ניתן להקצות את הטיקט. נסה שוב.',
                    confirmButtonColor: '#667eea'
                });
            }
        }
    };

    useEffect(()=>{
        dispatch(fetchUsers());
    },[dispatch,idT])

    const {users, loading:userLoading}=useSelector((state:RootState)=>state.users)
    const agents=users.filter((user:User)=>user.role==='agent');
    const {selectedTicket,loading:ticketLoading, updateLoading}=useSelector((state:RootState)=>state.tickets);
    
    if(ticketLoading){
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
            disabled={updateLoading || userLoading}
            sx={{ minWidth: 250 }}
        >
            <InputLabel id="assign-agent-label">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonAddIcon fontSize="small" />
                    הקצה סוכן
                </Box>
            </InputLabel>
            <Select
                labelId="assign-agent-label"
                value={selectedTicket?.assigned_to || ""}
                onChange={handleAssign}
                label="הקצה סוכן"
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
                    <em>בחר סוכן להקצאה</em>
                </MenuItem>
                {agents.map((agent:User) => (
                    <MenuItem key={agent.id} value={agent.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip 
                                label={agent.name} 
                                size="small"
                                color={selectedTicket?.assigned_to === agent.id ? "primary" : "default"}
                            />
                            <span style={{ fontSize: '0.875rem', color: '#666' }}>
                                {agent.email}
                            </span>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default AdminAction;