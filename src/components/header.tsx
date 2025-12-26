import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../store/authSlice";
import { NavLink, useNavigate } from "react-router";


export default function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout=()=>{
        dispatch(logout());
        navigate("/login",{replace:true});
    }
    const role = useSelector((state:RootState)=>state.auth.user?.role);
    return(
    <nav>
    <button onClick={handleLogout}>Logout</button>
    {role==="customer"&& <NavLink to="/tickets/new">Create Ticket</NavLink>}
    {role==="admin"&& <NavLink to="/users">Users</NavLink>}
    <NavLink to="/tickets">Tickets</NavLink>
    <NavLink to="/dashboard">Dashboard</NavLink>

    </nav>)
}