import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/header';
import type { RootState } from '../store';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

const MainLayout = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: 4,
          bgcolor: '#fafafa'
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
export default MainLayout;