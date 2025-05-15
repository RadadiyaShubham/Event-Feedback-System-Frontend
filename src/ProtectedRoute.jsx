import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem('token');

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  // Logged in, render the child component
  return children;
}
