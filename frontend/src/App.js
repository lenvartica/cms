import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Members from './pages/members/Members';
import MemberDetail from './pages/members/MemberDetail';
import Events from './pages/events/Events';
import EventDetail from './pages/events/EventDetail';
import Giving from './pages/giving/Giving';
import Ministries from './pages/ministries/Ministries';
import MinistryDetail from './pages/ministries/MinistryDetail';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              
              {/* Member Management */}
              <Route path="members" element={<Members />} />
              <Route path="members/:id" element={<MemberDetail />} />
              
              {/* Event Management */}
              <Route path="events" element={<Events />} />
              <Route path="events/:id" element={<EventDetail />} />
              
              {/* Giving Management */}
              <Route path="giving" element={<Giving />} />
              
              {/* Ministry Management */}
              <Route path="ministries" element={<Ministries />} />
              <Route path="ministries/:id" element={<MinistryDetail />} />
              
              {/* Reports */}
              <Route path="reports" element={<Reports />} />
              
              {/* Settings */}
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={5000} />
    </ThemeProvider>
  );
}

export default App;
