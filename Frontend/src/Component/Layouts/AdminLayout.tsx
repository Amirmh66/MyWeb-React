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
      <div className="flex overflow-y-hidden">
        <pageContext.Provider value={{ currentPage, setCurrentPage }}>
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="adminMain">
              <Outlet />
            </main>
          </div>
        </pageContext.Provider>
      </div>
    </>
  );
}
export default AdminLayout;
