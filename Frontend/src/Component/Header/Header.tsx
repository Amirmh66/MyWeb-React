import { IPageN } from "../../Types/Interfaces";
import "./Header.css";
import Language from "./navbar/Language";
import Notification from "./navbar/Notification";
import PageName from "./navbar/PageName";
import Profile from "./navbar/Profile";
import SearchBox from "./navbar/SearchBox";
import Theme from "./navbar/Theme";

export default function Header() {
  return (
    <>
      {/* Navbar  */}
      <nav className="bg-darkMode p-5 h-24 flex items-center justify-center">
        {/* PageName  */}
        <PageName />

        {/* SearchBox */}
        <SearchBox />

        {/* Choose-Language  */}
        <Language />

        {/* Theme  */}
        <Theme />

        {/* Bell & Notification  */}
        <Notification />

        {/* Profile */}
        <Profile/>
      </nav>
    </>
  );
}