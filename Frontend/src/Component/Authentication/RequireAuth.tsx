import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentRole } from "../Features/Authentication/AuthSlice/AuthSlice";
import { useSelector } from "react-redux";

interface IRequireAuth {
  children: JSX.Element;
  requiredRole: string;
}

const RequireAuth = ({ children, requiredRole }: IRequireAuth) => {
  const role = useSelector(selectCurrentRole);
  const location = useLocation();

   if (!role) {
     return <Navigate to="/notFound" state={{ from: location }} replace />;
   }
   if (role !== requiredRole) {
     return <Navigate to="/notFound" replace />;
   } 

  return children;
};

export default RequireAuth;
