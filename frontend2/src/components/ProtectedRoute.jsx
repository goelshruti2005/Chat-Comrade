import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("refresh_token");
  
    // If not authenticated, redirect to /get-started
    if (!isAuthenticated) {
      return <Navigate to="/get-started" replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;