import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Retrieve stored JWT token
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
