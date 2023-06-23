import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Protected({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

