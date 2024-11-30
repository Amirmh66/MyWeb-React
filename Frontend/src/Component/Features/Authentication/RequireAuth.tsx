import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentToken } from "./AuthSlice/AuthSlice";

function RequireAuth() {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const role = useSelector(selectCurrentRole);

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
