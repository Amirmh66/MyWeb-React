import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";
function HomePage() {
  return (
    <>
      <Link to={"/"}>
        <span
          title="Go To the HomePage"
          className="p-5 cursor-pointer"
        >
          <HomeIcon />
        </span>
      </Link>

    </>
  );
}

export default HomePage;
