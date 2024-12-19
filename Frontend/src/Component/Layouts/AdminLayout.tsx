import { Outlet } from "react-router-dom";
import { useState } from "react";
import { pageContext } from "../Context/PageNContext";
import Header from "../PanelAdmin/Header/Header";
import Sidebar from "../PanelAdmin/Sidebar/Sidebar";
import "../PanelAdmin/PanelAdminStyle/Styles.css";

function AdminLayout() {
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");
  return (
    <>
      <div className="flex">
        <pageContext.Provider value={{ currentPage, setCurrentPage }}>
          <div className="aside">
            <Sidebar />
          </div>

          <div className="flex-1">
            <Header />

            <main className="main p-3">
              <Outlet />
            </main>
          </div>
        </pageContext.Provider>
      </div>
    </>
  );
}
export default AdminLayout;
