import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Leaderboard from "../Pages/Leaderboard/Leaderboard";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Product from "../Pages/Product/Product";
import Users from "../Pages/Users/User";
import { useState } from "react";
import { pageContext } from "../Context/PageNContext";
import AddProduct from "../Pages/AddProduct/AddProduct";

function AdminLayout() {
  const [currentPage, setCurrentPage] = useState<string>("Dashboard");

  return (
    <>
      <BrowserRouter>
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
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/Leaderboard" element={<Leaderboard />} />
                  <Route path="/Product" element={<Product />} />
                  <Route path="/Users" element={<Users />} />
                  <Route path="/AddProduct" element={<AddProduct />} />
                </Routes>
              </main>
            </div>
          </pageContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}
export default AdminLayout;
