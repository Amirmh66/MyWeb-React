import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import SiteLogo from "./SiteLogo";
import {
  Dashboard,
  Leaderboard,
  Message,
  Order,
  Product,
  SalesReport,
  Setting,
  Signout,
  Users,
  Hamburger,
  Category,
  Role,
} from "../../Elements/Icons";
import type { Item } from "../../../Types/Interfaces";
import { pageContext } from "../../Context/PageNContext";
import { useContext } from "react";
import { useAuth } from "../../Provider/AuthProvider";

function Sidebar() {
  const { setCurrentPage } = useContext(pageContext);
  const redirect = useNavigate();
  const auth = useAuth();

  const logout = async () => {
    await auth?.logout();
    redirect("/");
  };

  const items: Item[] = [
    { id: 1, icon: <Dashboard />, name: "Dashboard", path: "Dashboard" },
    { id: 2, icon: <Leaderboard />, name: "Leaderboard", path: "Leaderboard" },
    { id: 3, icon: <Category />, name: "Categories", path: "Categories" },
    { id: 4, icon: <Order />, name: "Order", path: "Order" },
    { id: 5, icon: <Role />, name: "Roles", path: "Roles" },
    { id: 6, icon: <Product />, name: "Product", path: "Product" },
    { id: 7, icon: <SalesReport />, name: "SalesReport", path: "SalesReport" },
    { id: 8, icon: <Message />, name: "Message", path: "Message" },
    { id: 9, icon: <Users />, name: "Users", path: "Users" },
    { id: 10, icon: <Setting />, name: "Setting", path: "Setting" },
  ];

  return (
    <>
      <SiteLogo />
      <ul>
        <button className="HamburgerBtn">
          <Hamburger />
          <span className="sr-only">HamburgerMenu</span>
        </button>

        <div className="pt-5 text-center">
          {items.map((item) => (
            <li key={item.id} onClick={() => setCurrentPage(item.name)}>
              <NavLink
                id="li"
                className={({ isActive }) =>
                  isActive ? "bg-violet-900 text-gray-200" : ""
                }
                to={item.path}
              >
                {item.icon}
                <p className="li-txt">{item.name}</p>
              </NavLink>
            </li>
          ))}
          <li id="li" onClick={logout}>
            <Signout /> <p className="li-txt">Logout</p>
          </li>
        </div>
      </ul>
    </>
  );
}

export default Sidebar;
