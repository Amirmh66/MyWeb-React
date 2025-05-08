import "./Header.css";
import SearchBox from "./SectionsInHeader/SearchBox";
import Buttons from "./SectionsInHeader/Buttons";
import Logo from "../../Elements/Logo";
import Navbar from "./SectionsInHeader/Navbar";
import NavbarMobile from "../../Elements/NavbarMobile";
import MostSearchedByUsers from "./SectionsInHeader/MostSearchedByUsers";
import WebBanners from "./SectionsInHeader/WebBanners";
import ShoppingByCategories from "./SectionsInHeader/ShoppingByCategories";

function Header() {

  return (
    <>
      <div className="header">
        <Logo width="w-28 md:w-16" />
        <SearchBox />
        <MostSearchedByUsers />
        <Navbar />
        <Buttons />
        <WebBanners />
        <ShoppingByCategories />
      </div>
      <NavbarMobile />
    </>
  );
}

export default Header;
