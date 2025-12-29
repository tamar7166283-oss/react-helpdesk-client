import { Route, Routes } from "react-router-dom";
import  ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import TicketsListPage from "../pages/TicketsListPage";
import CreateTicketPage from "../pages/CreateTicketPage";
import TicketDetailsPage from "../pages/TicketDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";
import UsersPage from "../pages/UsersPage";
import MainLayout from "../pages/MainLayout";

const AppRouter = () => {
    return (
        <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={
    <ProtectedRoute> 
      <MainLayout />
    </ProtectedRoute>
    }>
   
    <Route path="/" element={<DashboardPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/tickets" element={<TicketsListPage />} />
    <Route path="/tickets/:id" element={<TicketDetailsPage />} />

    
    <Route path="/tickets/new" element={
      <ProtectedRoute allowedRoles={['customer']}>
        <CreateTicketPage />
      </ProtectedRoute>
    } />

    <Route path="/users" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <UsersPage />
      </ProtectedRoute>
    } />
    
    <Route path="*" element={<NotFoundPage />} />
  </Route>
      </Routes>
      </>
    );  
}

export default AppRouter;