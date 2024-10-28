import { Link } from "react-router-dom";
import { User } from "../../../Elements/Icons";
import { useAuth } from "../../../Provider/AuthProvider";

function Buttons() {
  const auth = useAuth();
  return (
    <>
      {auth?.isTokenExpired ? (
        <Link to={"login"}>
          <div className="login">login</div>
        </Link>
      ) : (
        <div>
          {auth?.role === "admin" && (
            <div className="flex">
              <Link to={"PanelAdmin"}>
                <div className="relative group">
                  <div
                    className="absolute blur -inset-0.5 bg-gradient-to-r from-pink-600 animate-tilt
          to-purple-600 rounded-lg opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200"
                  ></div>
                  <button className="Panel-btn">PanelAdmin</button>
                </div>
              </Link>
            </div>
          )}
          {auth?.role === "user" && (
            <Link to={"panelUser"}>
              <div className="p-2 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-full">
                <User />
              </div>
            </Link>
          )}
          {auth?.role === null && (
            <Link to={"login"}>
              <div className="login">login</div>
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Buttons;
