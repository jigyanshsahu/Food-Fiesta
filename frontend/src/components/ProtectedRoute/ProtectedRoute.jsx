import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

/**
 * Wraps a route that requires the user to be logged in.
 * If no token is found, redirects to the given path (default: '/').
 *
 * Usage: <Route path="/myorders" element={<ProtectedRoute><Myorders /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children, redirectTo = '/' }) => {
  const { token } = useContext(StoreContext);
  const savedToken = token || localStorage.getItem('token');
  if (!savedToken) return <Navigate to={redirectTo} replace />;
  return children;
};

export default ProtectedRoute;
