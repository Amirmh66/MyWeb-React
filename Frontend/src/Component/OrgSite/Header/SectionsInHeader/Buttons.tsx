import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { selectCurrentRole } from "../../../Features/Authentication/AuthSlice/AuthSlice";
import { useSelector } from "react-redux";
import { lazy, Suspense } from 'react'
import LoadingText from "../../../Elements/LoadingText";
const AdminBtn = lazy(() => import("../../../Elements/AdminBtn"))

function Buttons() {
  const role = useSelector(selectCurrentRole);
  return (
    <>
      <div className="hidden lg:block">
        <div className="hidden md:flex">
          <Suspense fallback={<LoadingText />}>
            {role === "admin" && (
              <AdminBtn />
            )}
          </Suspense>
        </div>
        <div className="hidden md:flex">
          <Suspense fallback={<LoadingText />}>
            {role === "Owner" && (
              <AdminBtn />
            )}
          </Suspense>
        </div>
        <div className="hidden md:flex">
          {role === "user" && (
            <Link to={"/panelUser"}>
              <div className="hover:text-orange-500 transition-all duration-150">
                <span className="inline-block w-6 md:w-8">
                  <UserCircleIcon />
                </span>
              </div>
            </Link>
          )}
        </div>
        {role === null && (
          <Link to={"login"}>
            <div className="login">login</div>
          </Link>
        )}
      </div>
    </>
  );
}

export default Buttons;
