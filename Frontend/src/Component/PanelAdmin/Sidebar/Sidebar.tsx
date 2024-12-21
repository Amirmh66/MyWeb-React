import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import SiteLogo from "./SiteLogo";
import { useAuth0 } from '@auth0/auth0-react';
import {
  ChartPieIcon, Bars3CenterLeftIcon, Squares2X2Icon, ShoppingBagIcon, DevicePhoneMobileIcon,
  ShoppingCartIcon, CurrencyDollarIcon, ChatBubbleLeftEllipsisIcon, PuzzlePieceIcon,
  UserGroupIcon, Cog8ToothIcon, FingerPrintIcon, Bars3Icon, ArrowRightStartOnRectangleIcon
} from '@heroicons/react/20/solid'
import type { Item } from "../../../Types/Interfaces";
import { pageContext } from "../../Context/PageNContext";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../Features/Authentication/AuthSlice/AuthSlice";

const items: Item[] = [
  { icon: <ChartPieIcon />, name: "Dashboard", path: "Dashboard" },
  { icon: <UserGroupIcon />, name: "Users", path: "Users" },
  { icon: <FingerPrintIcon />, name: "Roles", path: "Roles" },
  { icon: <ShoppingBagIcon />, name: "Product", path: "Product" },
  { icon: <Squares2X2Icon />, name: "Categories", path: "Categories" },
  { icon: <PuzzlePieceIcon />, name: "Brands", path: "Brands" },
  { icon: <DevicePhoneMobileIcon />, name: "Types", path: "Types" },
  { icon: <Bars3CenterLeftIcon />, name: "Leaderboard", path: "Leaderboard" },
  { icon: <ShoppingCartIcon />, name: "Order", path: "Order" },
  { icon: <CurrencyDollarIcon />, name: "SalesReport", path: "SalesReport" },
  { icon: <ChatBubbleLeftEllipsisIcon />, name: "Message", path: "Message" },
  { icon: <Cog8ToothIcon />, name: "Setting", path: "Setting" },
];

const Sidebar = () => {
  // const { logout, isAuthenticated } = useAuth0();
  const { setCurrentPage } = useContext(pageContext);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [isCloseSidebar, setIsCloseSidebar] = useState<Boolean>(false);
  const logout = async () => {
    dispatch(logOut())
    redirect("/");
  };
  return (
    <>
      <div id="aside" style={{
        width: isCloseSidebar && window.innerWidth <= 768 ? "0" : "250px"
        , overflow: isCloseSidebar ? "visible" : "hidden", transition: "width 0.3s ease-in-out"
      }}>
        <SiteLogo />
        <ul>
          <Bars3Icon className="w-7 md:hidden cursor-pointer rounded-lg bg-gray-600 hover:text-gray-500 items-center"
            onClick={() => setIsCloseSidebar(!isCloseSidebar)} />
          <p className="sr-only">HamburgerMenu</p>

          <div className="pt-2 md:pt-5  text-center">
            {items.map((item, index) => (
              <li key={index} onClick={() => setCurrentPage(item.name)}>
                <NavLink
                  id="li"
                  className={({ isActive }) =>
                    isActive ? "bg-violet-900 text-gray-200" : ""
                  }
                  to={item.path}
                >
                  <span className="w-7">
                    {item.icon}
                  </span>
                  <p className="li-txt">{item.name}</p>
                </NavLink>
              </li>
            ))}

            <li id="li" onClick={() => logout()}>
              <span className="w-6"> <ArrowRightStartOnRectangleIcon /></span> <p className="li-txt">Logout</p>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
