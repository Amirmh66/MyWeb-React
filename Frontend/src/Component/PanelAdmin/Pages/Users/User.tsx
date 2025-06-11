import { Outlet, useLocation } from "react-router-dom";
import UsersList from "./SectionInUsers/UsersList";

function User() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/PanelAdmin/Users" ? (
        <>
          <UsersList />
        </>
      ) : (
        <Outlet />
      )}

    </>
  );
}

export default User;