import "./Profile.css";
import Logo from "../../../Elements/Logo";
import { ShoppingCartIcon, UserCircleIcon, HeartIcon } from '@heroicons/react/20/solid'
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
      <div className="flex flex-col items-center justify-center gap-3 my-2 text-center">
        <Logo />
        {role === "admin" && (
          <AdminBtn />
        )}
        {role === "user" && (
          <Link to={"/panelUser"}>
          <div className="transition-all duration-150 hover:text-orange-500">
            <span className="inline-block w-6 md:w-8">
              <UserCircleIcon />
            </span>
          </div>
        </Link>
        )}
      </div>
      <div className="mx-3 my-5 border-t-2"></div>
      <div className="mx-2">
        <li className="flex gap-2 my-1 text-sm font-semibold cursor-pointer">
          <span className="w-6 text-sky-800">
            <ShoppingCartIcon />
          </span>
          <p>ShoppingCart</p>
        </li>
        <li className="flex gap-2 my-1 text-sm font-semibold cursor-pointer">
          <span className="w-6 text-red-500">
            <HeartIcon />
          </span>
          <p>Favorites</p>
        </li>
      </div>

      <div className="mx-3 my-5 border-t-2"></div>
      <div className="mx-2">
        <div>
          {guidanceItem.map((item) => (
            <Link to="/ShoppingCart">
              <li className="flex gap-2 my-1 text-sm font-semibold cursor-pointer" key={item.id}>
                <span className="w-6">{item.icon}</span>
                <p>{item.name}</p>
              </li>
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-3 my-5 border-t-2"></div>
    </>
  );
}

export default Profile;
