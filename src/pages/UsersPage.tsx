import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/usersSlice";
import { type RootState, type AppDispatch } from "../store";
import { CreateUser } from "../components/CreateUser";

export const UsersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    

const { users, loading, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <div>טוען משתמשים...</div>;
    if (error) return <div style={{ color: 'red' }}>שגיאה: {error}</div>;
    if (users.length === 0) return <div>לא נמצאו משתמשים במערכת.</div>;

    return (
        <div className="users-container">
            <h2>משתמשים</h2>
            <div className="users-list">
                {users.map((user) => (
                    <div key={user.id} >
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                    </div>
                ))}
            </div>
            <CreateUser />
        </div>
    );
};

export default UsersPage;