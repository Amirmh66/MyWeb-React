import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AuthLayout from "./AuthLayout";
import HomePage from "../OrgSite/HomePage";
import AddProduct from "../PanelAdmin/Pages/Product/AddProduct/AddProduct";
import EditProduct from "../PanelAdmin/Pages/Product/EditProduct/EditProduct";
import AddUser from "../PanelAdmin/Pages/Users/AddUser/AddUser";
import EditUser from "../PanelAdmin/Pages/Users/EditUser/EditUser";
import MoreInfo from "../PanelAdmin/Pages/Users/MoreInfo/MoreInfo";
import Order from "../PanelAdmin/Pages/Order/Order";
import Dashboard from "../PanelAdmin/Pages/Dashboard/Dashboard";
import Users from "../PanelAdmin/Pages/Users/User";
import Leaderboard from "../PanelAdmin/Pages/Leaderboard/Leaderboard";
import Product from "../PanelAdmin/Pages/Product/Product";
import Categories from "../PanelAdmin/Pages/Categories/Categories";
import AddCategory from "../PanelAdmin/Pages/Categories/AddCategory/AddCategory";
import EditCategory from "../PanelAdmin/Pages/Categories/EditCategory/EditCategory";

function Container() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/PanelAdmin" element={<AdminLayout />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Leaderboard" element={<Leaderboard />} />
          <Route path="Order" element={<Order />} />
          {/* Product */}
          <Route path="Product" element={<Product />}>
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="EditProduct/:id" element={<EditProduct />} />
          </Route>

          {/* User */}
          <Route path="Users" element={<Users />}>
            <Route path="AddUser" element={<AddUser />} />
            <Route path="EditUser/:id" element={<EditUser />} />
            <Route path="MoreInfoUser/:id" element={<MoreInfo />} />
          </Route>

          {/* Categories */}
          <Route path="Categories" element={<Categories/>}>
            <Route path="AddCategory" element={<AddCategory/>}/>
            <Route path="EditCategory/:id" element={<EditCategory/>}/>
          </Route>
        </Route>

        <Route path="/Login" element={<AuthLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Container;
