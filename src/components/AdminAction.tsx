import { useSelector,useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import type User from "../types/users"
import { fetchPriorities, updateTicket } from "../store/ticketsSlice"
import { useEffect } from "react"
import { fetchUsers } from "../store/usersSlice"
import LoadingSpinner from "./LoadingSpinner"
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack
} from '@mui/material'
import { AssignmentInd as AssignIcon, Flag as PriorityIcon } from '@mui/icons-material'
import { showSuccessToast } from "../utils/sweetAlertUtils"

interface AdminActionProps{
    idT:number
}

export function AdminAction({idT}: AdminActionProps){ 
    const dispatch = useDispatch<AppDispatch>();

    const handleAssign = async (event: React.ChangeEvent<HTMLSelectElement>) => {
       await dispatch(updateTicket({id:idT, data: {assigned_to:Number(event.target.value)}}))
       showSuccessToast('הסוכן הוקצה בהצלחה!');
    }

    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(updateTicket({ id: idT, data: { priority_id: Number(event.target.value) } }))
    }

    useEffect(() => {
        if(priorities.length === 0)
        dispatch(fetchPriorities());
        if(users.length === 0)
        dispatch(fetchUsers());
    }, [dispatch, idT])

    const {users, loading: userLoading} = useSelector((state:RootState) => state.users)
    const agents = users.filter((user:User) => user.role === 'agent');
    const {priorities, priorityLoading, selectedTicket, loading: ticketLoading} = useSelector((state:RootState) => state.tickets);

    if(userLoading || priorityLoading || ticketLoading || !selectedTicket){
        return <LoadingSpinner />;
    }

    return(
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flex: 1 }}>
            {/* הקצאה לסוכן */}
            <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                    <InputLabel 
                        id="agent-select-label"
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
                        הקצאה לסוכן
                    </InputLabel>
                    <Select
                        labelId="agent-select-label"
                        value={selectedTicket?.assigned_to || ""}
                        onChange={(e) => handleAssign(e as any)}
                        label="הקצאה לסוכן"
                        startAdornment={<AssignIcon sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />}
                        displayEmpty
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
                        <MenuItem 
                            value="" 
                            disabled 
                            sx={{ 
                                justifyContent: 'flex-end',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            }}
                        >
                            <em>בחר סוכן להקצאה</em>
                        </MenuItem>
                        {agents.map((agent:User) => (
                            <MenuItem 
                                key={agent.id} 
                                value={agent.id} 
                                sx={{ 
                                    justifyContent: 'flex-end',
                                    fontFamily: '"Assistant", "Roboto", sans-serif'
                                }}
                            >
                                {agent.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* שינוי עדיפות */}
            <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                    <InputLabel 
                        id="priority-select-label"
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
                        שינוי עדיפות
                    </InputLabel>
                    <Select
                        labelId="priority-select-label"
                        value={selectedTicket?.priority_id || ""}
                        onChange={(e) => handlePriorityChange(e as any)}
                        label="שינוי עדיפות"
                        startAdornment={<PriorityIcon sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />}
                        displayEmpty
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
                        <MenuItem 
                            value="" 
                            disabled 
                            sx={{ 
                                justifyContent: 'flex-end',
                                fontFamily: '"Assistant", "Roboto", sans-serif'
                            }}
                        >
                            <em>קבע עדיפות</em>
                        </MenuItem>
                        {priorities.map((p) => (
                            <MenuItem 
                                key={p.id} 
                                value={p.id} 
                                sx={{ 
                                    justifyContent: 'flex-end',
                                    fontFamily: '"Assistant", "Roboto", sans-serif'
                                }}
                            >
                                {p.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Stack>
    )
}

export default AdminAction;