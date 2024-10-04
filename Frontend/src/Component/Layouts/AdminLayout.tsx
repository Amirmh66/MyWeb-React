import { Outlet } from "react-router-dom";
import { useState } from "react";
import { pageContext } from "../Context/PageNContext";
import Header from "../PanelAdmin/Header/Header";

import Sidebar from "../PanelAdmin/Sidebar/Sidebar";

function AdminLayout() {
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");
  return (
    <>
      <div className="flex h-full">
        <pageContext.Provider value={{ currentPage, setCurrentPage }}>
          <div className="aside">
            <Sidebar />
          </div>

          <div className="flex-1">
            {/* Header */}
            <Header />
            {/* Main */}
            <main className="main">
              <Outlet />
            </main>
          </div>
        </pageContext.Provider>
      </div>
    </>
  );
}
export default AdminLayout;
