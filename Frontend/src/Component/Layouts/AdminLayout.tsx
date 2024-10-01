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
import EditProduct from "../Pages/Product/EditProduct/EditProduct";
import AddProduct from "../Pages/Product/AddProduct/AddProduct";
import AddUser from "../Pages/Users/AddUser/AddUser";
import EditUser from "../Pages/Users/EditUser/EditUser";
import MoreInfo from "../Pages/Users/MoreInfo/MoreInfo";

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
              <main className="main ">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/Leaderboard" element={<Leaderboard />} />
                  {/* Product */}
                  <Route path="/Product" element={<Product />} />
                  <Route path="/AddProduct" element={<AddProduct />} />
                  <Route path="/EditProduct/:id" element={<EditProduct />} />
                  {/* User */}
                  <Route path="/Users" element={<Users />} />
                  <Route path="/AddUser" element={<AddUser />} />
                  <Route path="/EditUser/:id" element={<EditUser />} />
                  <Route path="/MoreInfoUser/:id" element={<MoreInfo />} />
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
