// components/PrivateRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Chargement...</div>; // tu peux mettre un spinner

  if (!user) return <Navigate to="/login" replace />;

  // Si tout est ok, on rend les enfants
  return children ? children : <Outlet />;
};

export default PrivateRoute;
