import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import SiteLogo from "./SiteLogo";
import {
  ChartPieIcon, Bars3CenterLeftIcon, Squares2X2Icon, ShoppingBagIcon, DevicePhoneMobileIcon,
  ShoppingCartIcon, CurrencyDollarIcon, ChatBubbleLeftEllipsisIcon, PuzzlePieceIcon, ChevronDownIcon,
  UserGroupIcon, Cog8ToothIcon, FingerPrintIcon, Bars3Icon, UserIcon
} from '@heroicons/react/20/solid'
import type { Item } from "../../../Types/Interfaces";
import { pageContext } from "../../Context/PageNContext";
import { useContext, useState } from "react";

const items: Item[] = [
  { icon: <ChartPieIcon />, name: "Dashboard", path: "Dashboard" },
  { icon: <Bars3CenterLeftIcon />, name: "Leaderboard", path: "Leaderboard" },
  { icon: <ShoppingCartIcon />, name: "Order", path: "Order" },
  { icon: <CurrencyDollarIcon />, name: "SalesReport", path: "SalesReport" },
  { icon: <ChatBubbleLeftEllipsisIcon />, name: "Message", path: "Message" },
];

const UsersItem: Item[] = [
  { icon: <UserGroupIcon />, name: "Users", path: "Users" },
  { icon: <FingerPrintIcon />, name: "Roles", path: "Roles" },
];

const ProductsItem: Item[] = [
  { icon: <ShoppingBagIcon />, name: "Product", path: "Product" },
  { icon: <Squares2X2Icon />, name: "Categories", path: "Categories" },
  { icon: <PuzzlePieceIcon />, name: "Brands", path: "Brands" },
  { icon: <DevicePhoneMobileIcon />, name: "Types", path: "Types" },
]

const SettingItem: Item[] = [
  { icon: <UserIcon />, name: "Profile", path: "AdminProfile" },
  { icon: <Cog8ToothIcon />, name: "Setting", path: "Setting" },

]

const Sidebar = () => {
  const [isOpenProductSec, setIsOpenProductSec] = useState(false);
  const [isOpenUserSec, setIsOpenUserSec] = useState(false);
  const { setCurrentPage } = useContext(pageContext);
  const [isCloseSidebar, setIsCloseSidebar] = useState<Boolean>(false);
  return (
    <>
      <div id="aside" style={{
        width: isCloseSidebar && window.innerWidth <= 768 ? "0" : "250px"
        , overflow: isCloseSidebar ? "visible" : "hidden", transition: "width 0.3s ease"
      }}>
        <SiteLogo />
        <Bars3Icon className="w-7 md:hidden cursor-pointer rounded-lg bg-gray-600 hover:text-gray-500 items-center"
          onClick={() => setIsCloseSidebar(!isCloseSidebar)} />
        <p className="sr-only">HamburgerMenu</p>
        <ul className="pt-2 md:pt-5 text-center">
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
          {/* ProductItems */}
          <div>
            <li id="li-item" onClick={() => setIsOpenProductSec(!isOpenProductSec)}>
              <ShoppingBagIcon className="w-6" />
              <p className="li-txt">Products</p>
              <span className="w-4 text-gray-400">
                {isOpenProductSec ? (<ChevronDownIcon className="transform rotate-180 transition-all duration-1000" />)
                  : (<ChevronDownIcon className="transform rotate-360 transition-all duration-1000" />)}
              </span>
            </li>
            <div className={`bg-gray-200 dark:bg-gray-950 border border-gray-300 dark:border-gray-900 z-50 rounded-xl
               transition-all duration-500 drop-shadow-xl
                ${isOpenProductSec ? ("h-full opacity-100") : ("h-0 opacity-0")}`}>
              {ProductsItem.map((item, index) => (
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
            </div>
          </div>
          {/* UserItems */}
          <div>
            <li id="li-item" onClick={() => setIsOpenUserSec(!isOpenUserSec)}>
              <UserGroupIcon className="w-6" />
              <p className="li-txt">Users</p>
              <span className="w-4 text-gray-400">
                {isOpenUserSec ? (<ChevronDownIcon className="transform rotate-180 transition-all duration-1000" />)
                  : (<ChevronDownIcon className="transform rotate-360 transition-all duration-1000" />)}
              </span>

            </li>
            <div className={`bg-gray-200 dark:bg-gray-950 border border-gray-300 dark:border-gray-900 z-50 rounded-xl
               transition-all duration-500 ease-out drop-shadow-xl
                ${isOpenUserSec ? ("h-full opacity-100") : ("h-0 opacity-0")}`}>
              {UsersItem.map((item, index) => (
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
            </div>
          </div>
          {/* OtherText */}
          <div className="flex items-center gap-1">
            <p className="text-gray-400 text-sm font-bold">Other</p>
            <div className="border-b-2 flex-grow mt-1 opacity-30 rounded-bl-full rounded-tl-full"></div>
          </div>
          {/* Setting */}
          <div>
            {SettingItem.map((item, index) => (
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
          </div>
        </ul>
      </div>
    </>
  );
}
export default Sidebar