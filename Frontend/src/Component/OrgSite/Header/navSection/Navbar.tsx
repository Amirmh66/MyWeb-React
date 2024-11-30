import { NavLink } from "react-router-dom";
interface Item {
  id: number;
  name: string;
  path: string;
}

function Navbar() {
  const navbar: Item[] = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Categories", path: "Categories" },
    { id: 3, name: "AboutUs", path: "AboutUs" },
    { id: 4, name: "ContactUs", path: "ContactUs" },
  ];
  return (
    <>
      <div className="hidden md:flex  py-2 gap-8">
        {navbar.map((li) => (
          <li key={li.id} className="hover:border-b border-blue-700 list-none">
            <NavLink
              to={li.path}
              key={li.id}
              id="navli"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-semibold" : ""
              }
            >
              <p>{li.name}</p>
            </NavLink>
          </li>
        ))}
      </div>
    </>
  );
}

export default Navbar;
