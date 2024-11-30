import "./Header.css";
import SearchBox from "./navSection/SearchBox";
import Buttons from "./navSection/Buttons";
import Logo from "../../Elements/Logo";
import Navbar from "./navSection/Navbar";
import NavbarMobile from "../../Elements/NavbarMobile";


function Header() {
 
  return (
    <>
      <nav className="header">
        <Logo />
        <SearchBox />
        <Navbar />
        <Buttons />
      </nav>
      <NavbarMobile/>
    </>
  );
}

export default Header;
