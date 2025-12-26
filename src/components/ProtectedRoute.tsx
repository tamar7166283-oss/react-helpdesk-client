import { type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Navigate, useLocation } from "react-router-dom";
import {type Role } from "../types/users";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRoles?: Role[];
}

const ProtectedRoute = ({ children,allowedRoles }: ProtectedRouteProps) => {
    const role= useSelector((state: RootState) => state.auth.user?.role);
    const {isAuthenticated}= useSelector((state: RootState) => state.auth);
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    if (allowedRoles && !allowedRoles.includes(role as Role)) {
        return <Navigate to="/signup" replace />;
    }

    return children;
}

export default ProtectedRoute;  