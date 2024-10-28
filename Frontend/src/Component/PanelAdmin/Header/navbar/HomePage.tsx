import { Link } from "react-router-dom";
import { Home } from "../../../Elements/Icons";
function HomePage() {
  return (
    <>
    <Link to={"/"}>
    <div
        title="Go To the HomePage"
        className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-full cursor-pointer"
      >
        <Home />
      </div>
    </Link>
      
    </>
  );
}

export default HomePage;
