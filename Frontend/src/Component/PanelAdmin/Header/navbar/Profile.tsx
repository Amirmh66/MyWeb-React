import { ChevronDownIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentUserName, logOut } from "../../../Features/Authentication/AuthSlice/AuthSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../../Elements/Modal";
import Button from "../../../Elements/Buttons";

function Profile() {
  const userName = useSelector(selectCurrentUserName);
  const role = useSelector(selectCurrentRole);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    dispatch(logOut());
    navigate("/")
  };

  return (
    <>
      <div className="basis-4/5 relative cursor-pointer hidden md:flex color-txt select-none" onClick={() => setIsOpen(!isOpen)} >
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
                onClick={() => setShowModal(true)}>
                <p className="text-sm font-semibold">Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal title="Are you sure you want to logout?" icon={<ExclamationTriangleIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-slate-700" text="Logout" onClick={handleConfirm} />
        <Button className="bg-slate-400" text="Close" onClick={() => setShowModal(false)} />
      </Modal>
    </>
  )
}
export default Profile;