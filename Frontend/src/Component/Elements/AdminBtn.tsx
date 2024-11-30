import { Link } from "react-router-dom";

function AdminBtn() {
  return (
    <>
      <div className="flex">
        <Link to={"/PanelAdmin/Dashboard"}>
          <div className="relative group">
            <div
              className="absolute blur -inset-0.5 bg-gradient-to-r from-pink-600 animate-tilt
          to-purple-600 rounded-lg opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200"
            ></div>
            <button className="Panel-btn">PanelAdmin</button>
          </div>
        </Link>
      </div>
    </>
  );
}

export default AdminBtn;
