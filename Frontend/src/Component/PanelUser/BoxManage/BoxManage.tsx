import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Alert from "../../Elements/Alert";
import { useDispatch } from "react-redux";
import { logOut } from "../../Features/Authentication/AuthSlice/AuthSlice";

function BoxManage() {
  const navigate = useNavigate();
  const [showMes, setShowMes] = useState(false);
  const dispatch = useDispatch();

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
      <div className="boxManage">
        <p className="sr-only">BoxUserManagement</p>
        <div className="w-64 md:w-52">
          <div className="user">Account User</div>

          <Link to={"/ManageDevices"}>
            <div className="crm-item">
              <p className="li-manage">Manage Devices</p>
            </div>
          </Link>
          <Link to={"/EditUser"}>
            <div className="crm-item">
              <p className="li-manage">Edit User Info</p>
            </div>
          </Link>
          <Link to={"/ChangePassword"}>
            <div className="crm-item">
              <p className="li-manage">Change Password</p>
            </div>
          </Link>
          <Menu as="div" className="relative inline-block text-left w-full">
            <div>
              <MenuButton className="menuButton">
                Theme
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>
            <MenuItems transition className="dropDownbtn">
              <div className="py-1">
                <MenuItem>
                  <a className="menuItem">Default</a>
                </MenuItem>
                <MenuItem>
                  <a className="menuItem">
                    Dark
                  </a>
                </MenuItem>
                <MenuItem>
                  <a className="menuItem">
                    Light
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          <div className="crm-item">
            <a onClick={showMessage} className="li-manage">
              Logout
            </a>
          </div>
        </div>
      </div>
      {showMes && (
        <Alert
          message="Are you sure logout?"
          onCancle={handleCancle}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default BoxManage;
