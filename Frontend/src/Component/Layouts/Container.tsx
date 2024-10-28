import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
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
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import AuthLayout from "./AuthLayout";
import Roles from "../PanelAdmin/Pages/Roles/Roles";
import AddRole from "../PanelAdmin/Pages/Roles/AddRoles/AddRole";
import EditRole from "../PanelAdmin/Pages/Roles/EditRoles/EditRole";
import ProductDetail from "../OrgSite/Sections/Product/ProductDetail/ProductDetail";
import UserLayout from "./UserLayout";
import PanelUser from "../PanelUser/PanelUser";
import RequireAuth from "../Authentication/RequireAuth";
import PanelEditor from "../PanelEditor/PanelEditor";
import Error404 from "../Authentication/unAuthorized/Error404";

function Container() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />}>
            <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          </Route>
          {/* Public */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            }
          />
          <Route
          path="/notFound"
          element={
            <AuthLayout>
              <Error404/>
            </AuthLayout>
          }
        />
        
          {/* ProtectedRoutes/private */}
          {/* panelAdmin */}
          <Route
            path="/PanelAdmin"
            element={
              <RequireAuth requiredRole="admin">

                <AdminLayout />
              </RequireAuth>
           
            }
          >
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Leaderboard" element={<Leaderboard />} />
            <Route path="Order" element={<Order />} />

            <Route path="Product" element={<Product />}>
              <Route path="AddProduct" element={<AddProduct />} />
              <Route path="EditProduct/:id" element={<EditProduct />} />
            </Route>

            <Route path="Roles" element={<Roles />}>
              <Route path="AddRole" element={<AddRole />} />
              <Route path="EditRole/:id" element={<EditRole />} />
            </Route>

            <Route path="Users" element={<Users />}>
              <Route path="AddUser" element={<AddUser />} />
              <Route path="EditUser/:id" element={<EditUser />} />
              <Route path="MoreInfoUser/:id" element={<MoreInfo />} />
            </Route>

            <Route path="Categories" element={<Categories />}>
              <Route path="AddCategory" element={<AddCategory />} />
              <Route path="EditCategory/:id" element={<EditCategory />} />
            </Route>
          </Route>

          {/* EditorPanel */}
          <Route
            path="/PanelEditor"
            element={
              <RequireAuth requiredRole="">
                <PanelEditor />
              </RequireAuth>
            }
          >
            <Route path="Dashboard" element={<Dashboard />} />

            <Route path="Categories" element={<Categories />}>
              <Route path="EditCategory/:id" element={<EditCategory />} />
            </Route>

            <Route path="Product" element={<Product />}>
              <Route path="EditProduct/:id" element={<EditProduct />} />
            </Route>
          </Route>

          {/* ProtectedRoutes/private */}
          {/* PanelUser */}

          <Route
            path="panelUser"
            element={
              <RequireAuth requiredRole="user">
                <UserLayout>
                  <PanelUser />
                </UserLayout>
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default Container;
