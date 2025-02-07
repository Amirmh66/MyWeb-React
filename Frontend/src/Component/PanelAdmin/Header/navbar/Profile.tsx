import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentUserName, logOut } from "../../../Features/Authentication/AuthSlice/AuthSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../../Elements/Alert";

function Profile() {
  const userName = useSelector(selectCurrentUserName);
  const role = useSelector(selectCurrentRole);
  const [isOpen, setIsOpen] = useState(false);
  const [showMes, setShowMes] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancle = async () => {
    setShowMes(false);
  };
  const showMessage = async () => {
    setShowMes(true);
  };
  const handleConfirm = async () => {
    dispatch(logOut());
    navigate("/")
  };

  return (
    <>
      <div className="basis-4/5 relative cursor-pointer hidden md:flex color-txt" onClick={() => setIsOpen(!isOpen)} >
        <img src="/Images/PicUser.png" className="size-12 rounded-md" />

        <div className="User-AL">
          {/* UserName */}
          <p className="font-semibold">{userName}</p>
          {/* AccessLevel */}
          <p className="font-semibold text-sm">{role}</p>
        </div>

        <div className="hidden md:block w-5 ">
          {isOpen ? (<ChevronDownIcon className="transform rotate-180 transition-all duration-1000" />)
            : (<ChevronDownIcon className="transform rotate-360 transition-all duration-1000" />)}

        </div>
        <div className={`absolute bg-white dark:bg-gray-950 shadow-xl z-50 rounded-xl py-1 transition-all 
        duration-150 w-32 top-12 border dark:border-gray-700  overflow-hidden 
         ${isOpen ? ("max-h-80 opacity-100") : ("h-0 opacity-0")}`}>
          <div>
            <ul>
              <Link to="AdminProfile">
                <li className="hover:bg-gray-200 dark:hover:bg-gray-900 p-2 transition duration-200 text-start">
                  <p className="text-sm font-semibold">Profile</p>
                </li>
              </Link>
              <li className="hover:bg-gray-200 dark:hover:bg-gray-900 p-2 transition duration-200 text-start"
                onClick={showMessage}>
                <p className="text-sm font-semibold">Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {
        showMes && (
          <Alert
            message="Are you sure logout?"
            onCancle={handleCancle}
            onConfirm={handleConfirm}
          />
        )
      }
    </>
  )
}

export default Profile;
