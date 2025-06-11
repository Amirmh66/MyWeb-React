import { Outlet, useLocation } from "react-router-dom";
import RoleList from "./SectionInForm/RoleList";

function Roles() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/PanelAdmin/Roles" ? (
        <>
          <RoleList />
        </>
      ) : (
        <Outlet />
      )}

    </>
  );
}
export default Roles