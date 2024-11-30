import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
} from "@heroicons/react/16/solid";
import { NavLink } from "react-router-dom";

interface IItems {
  id: number;
  icon: JSX.Element;
  name: string;
  path: any;
}

function NavbarMobile() {
  const items: IItems[] = [
    { id: 1, icon: <MagnifyingGlassIcon />, name: "Search", path: "/" },
    {
      id: 2,
      icon: <Squares2X2Icon />,
      name: "Categories",
      path: "/Categories",
    },
    {
      id: 3,
      icon: <ShoppingCartIcon />,
      name: "ShoppingCart",
      path: "/ShoppingCart",
    },
    { id: 4, icon: <UserCircleIcon />, name: "Profile", path: "/Profile" },
  ];
  return (
    <>
      <footer className="md:hidden fixed bottom-0 w-full z-20 border-t border-gray-300">
        <div className="bg-white py-1 px-1 ">
          <div className="flex justify-around gap-5">
            {items.map((i) => (
              <NavLink
                key={i.id}
                to={i.path}
                id="footer-btn"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
              >
                <span className="w-7">{i.icon}</span>
                <span className="footer-txt">{i.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

export default NavbarMobile;
