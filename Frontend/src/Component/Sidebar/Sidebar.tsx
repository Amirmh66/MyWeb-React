import { Link } from "react-router-dom";
import "./Sidebar.css";
import '../GlobalStyle/Glogbal.css'
import SiteLogo from "./SiteLogo";
import { Hamburger } from "../Elements/Icons";
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
} from "../Elements/Icons";
import type { Item } from "../../Types/Interfaces";
import { pageContext } from "../Context/PageNContext";
import { useContext } from "react";

function Sidebar() {
  const { setCurrentPage } = useContext(pageContext);

  const items: Item[] = [
    { id: 1, icon: <Dashboard />, name: "Dashboard", path: "/" },
    { id: 2, icon: <Leaderboard />, name: "Leaderboard", path: "/Leaderboard" },
    { id: 3, icon: <Order />, name: "Order", path: "/Order" },
    { id: 4, icon: <Product />, name: "Product", path: "/Product" },
    { id: 5, icon: <SalesReport />, name: "SalesReport", path: "/SalesReport" },
    { id: 6, icon: <Message />, name: "Message", path: "/Message" },
    { id: 7, icon: <Users />, name: "Users", path: "/Users" },
    { id: 8, icon: <Setting />, name: "Setting", path: "/Setting" },
    { id: 9, icon: <Signout />, name: "SignOut", path: "/Signout" },
  ];

  return (
    <>
      {/* Logo  */}
      <SiteLogo />

      {/* Lists */}
      <ul>
        {/* HamburgerBtn */}
        <button className="HamburgerBtn">
          <Hamburger />
          <span className="sr-only">HamburgerMenu</span>
        </button>

        <div className="pt-5 text-center">
          {items.map((item) => (
            <li key={item.id} onClick={() => setCurrentPage(item.name)}>
              <Link className="li" to={item.path}>
                {item.icon}
                <p className="li-txt">{item.name}</p>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
}

export default Sidebar;
