import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';

export default function App() {
  const isLoggedIn = localStorage.getItem('joburio_logged_in');
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <JobListPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
      </Routes>
    </Router>
  );
}