import "./Header.css";
import Notification from "./navbar/Notification";
import PageName from "./navbar/PageName";
import Profile from "./navbar/Profile";

export default function Header() {
  return (
    <>
      <nav className="nav">
        <PageName />

        <Notification />

        <Profile />
      </nav>
    </>
  );
}
