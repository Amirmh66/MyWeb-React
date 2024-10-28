import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

interface IRequireAuth {
  children: JSX.Element;
  requiredRole: string;
}

const RequireAuth = ({ children, requiredRole }: IRequireAuth) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.role) {
    return <Navigate to="/notFound" state={{ from: location }} replace />;
  }
  if (auth.role !== requiredRole) {
    return <Navigate to="/notFound" replace />;
  }

  return children;
};

export default RequireAuth;
