import { Link } from "react-router-dom";
import { Home } from "../../Elements/Icons";
import { useAuth } from "../../Provider/AuthProvider";

function Title() {
  const auth = useAuth();
  return (
    <>
      <div className="title">
        <Link to={"/"}>
          <div className="w-16 cursor-pointer flex items-center gap-2">
            <img srcSet="/Images/Darwin.png" alt="" />
            <h1>MyPanel</h1>
          </div>
        </Link>

        <Link to={"/"}>
          <div className="p-2 hover:bg-gray-200 rounded-full transition-all">
            <Home />
          </div>
        </Link>
      </div>
    </>
  );
}

export default Title;
