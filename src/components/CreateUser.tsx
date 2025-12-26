import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser as createUserThunk} from "../store/usersSlice";
import {  type AppDispatch, type RootState } from "../store";
import { useNavigate } from "react-router-dom";

interface UserFormValue {
    name: string;
    email: string;
    password: string;
    role: string;
}

export const CreateUser = () => {
    const {loading,error}=useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const {register, handleSubmit, formState: { errors }} = useForm<UserFormValue>();
    const navigate = useNavigate();

const onSubmit = async(data: UserFormValue) => {
    dispatch(createUserThunk(data));
    navigate("/users");
}


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
           <label htmlFor="name">Name:</label>
           <input id="name"
            {...register("name",{required: "Name is required"})} type="text" />
            {errors.name && <p>{errors.name.message}</p>}
            <label htmlFor="email">Email:</label>
            <input id="email" {...register("email",{required: "Email is required"})} type="email" />
            {errors.email && <p>{errors.email.message}</p>}
            <label htmlFor="password">Password:</label>
            <input id="password" {...register("password",{required: "Password is required"})} type="password" />
            {errors.password && <p>{errors.password.message}</p>}
            <label htmlFor="role">Role:</label>
            <select id="role" {...register("role", { required: true })}>
                <option value="customer">לקוח</option>
                <option value="agent">נציג</option>
                <option value="admin">מנהל</option>
            </select>
            {errors.role && <p>{errors.role.message}</p>}
            <button type="submit" disabled={loading}>Create User</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default CreateUser;