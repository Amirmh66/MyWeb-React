import "./Header.css";
import Logo from "./nav/Logo";
import Navbar from "./nav/Navbar";
import SearchBox from "./nav/SearchBox";
import Buttons from "./nav/Buttons";

function Header() {
  return (
    <>
      <nav className="header">
        <Logo />
        <SearchBox />
        <Navbar />
        <Buttons />
      </nav>
    </>
  );
}

export default Header;
