import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
// import DashboardPage from "../pages/DashboardPage";
import TicketsListPage from "../pages/TicketsListPage";
import CreateTicketPage from "../pages/CreateTicketPage";
import TicketDetailsPage from "../pages/TicketDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";
import UsersPage from "../pages/UsersPage";
import DashboardPage from "../pages/DashboardPage";

const AppRouter = () => {
    return (
        <>
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
        <DashboardPage />
        </ProtectedRoute>
      } />  

      <Route path='tickets' element={
        <ProtectedRoute>
        <TicketsListPage />
        </ProtectedRoute>
        } />

      <Route path='tickets/new' element={
        <ProtectedRoute allowedRoles={['customer']}>
        <CreateTicketPage />
        </ProtectedRoute>
        } />

      <Route path='tickets/:id' element={<TicketDetailsPage />} />

      <Route path='users' element={
        <ProtectedRoute allowedRoles={['admin']}>
        <UsersPage />
        </ProtectedRoute>
        } />
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/' element={<SignupPage />} />
      </Routes>
      </>
    );  
}

export default AppRouter;