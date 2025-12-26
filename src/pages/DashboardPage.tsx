import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useEffect } from 'react';


export default function DashboardPage() {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const user= useSelector((state: RootState) => state.auth.user);

    useEffect(() => { 
    }, [role, user]);
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{user?.name}</p>
            <p>Welcome to the dashboard page!</p>
            <p>Your role is: {role}</p>
        </div>
    );


 


}
