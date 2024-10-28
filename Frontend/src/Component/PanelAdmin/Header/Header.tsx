import "./Header.css";
import HomePage from "./navbar/HomePage";
import Language from "./navbar/Language";
import Notification from "./navbar/Notification";
import PageName from "./navbar/PageName";
import Profile from "./navbar/Profile";
import SearchBox from "./navbar/SearchBox";
import Theme from "./navbar/Theme";

export default function Header() {
  return (
    <>
      <nav className="nav">
        <PageName />

        <SearchBox />

        {/* <Language /> */}
        <HomePage/>

        <Theme />

        <Notification />

        <Profile />
      </nav>
    </>
  );
}
