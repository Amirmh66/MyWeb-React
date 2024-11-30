import "./Profile.css";
import Logo from "../../../Elements/Logo";
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import AdminBtn from "../../../Elements/AdminBtn";
import NavbarMobile from "../../../Elements/NavbarMobile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../../Features/Authentication/AuthSlice/AuthSlice";

interface IItem {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}

function Profile() {
  const role = useSelector(selectCurrentRole);
  const guidanceItem: IItem[] = [
    { id: 1, name: "Suppurt", icon: <ShoppingCartIcon />, path: "" },
    { id: 2, name: "AboutUs", icon: <ShoppingCartIcon />, path: "" },
    { id: 3, name: "MyBlog", icon: <ShoppingCartIcon />, path: "" },
  ];

  return (
    <>
      <div className="flex flex-col items-center my-2 justify-center gap-3 text-center">
        <Logo />
        {role === "admin" && (
          <AdminBtn />
        )}
        {role === "user" && (
          <Link to={"panelUser"}>
          <div className="hover:text-orange-500 transition-all duration-150">
            <span className="inline-block w-6 md:w-8">
              <UserCircleIcon />
            </span>
          </div>
        </Link>
        )}
      </div>
      <div className="border-t-2 my-5 mx-3"></div>
      <div className="mx-2">
        <li className="my-1 text-sm font-semibold flex gap-2 cursor-pointer">
          <span className="w-6">
            <ShoppingCartIcon />
          </span>
          <p>ShoppingCart</p>
        </li>
      </div>

      <div className="border-t-2 my-5 mx-3"></div>
      <div className="mx-2">
        <div>
          {guidanceItem.map((item) => (
            <Link to="/ShoppingCart">
              <li className="my-1 text-sm font-semibold flex gap-2 cursor-pointer" key={item.id}>
                <span className="w-6">{item.icon}</span>
                <p>{item.name}</p>
              </li>
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t-2 my-5 mx-3"></div>
      <NavbarMobile />
    </>
  );
}

export default Profile;
