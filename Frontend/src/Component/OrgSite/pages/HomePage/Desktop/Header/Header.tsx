import "./Header.css";
import SearchBox from "../../Shared/SearchBox";
import Buttons from "./SectionsInHeader/Buttons";
import Logo from "../../../../../Elements/Logo";
import Navbar from "./SectionsInHeader/Navbar";

function Header() {

  return (
    <>
      <div className="header">
        <Logo width="md:w-16" />
        <SearchBox />
        <Navbar />
        <Buttons />
      </div>
    </>
  );
}

export default Header;
