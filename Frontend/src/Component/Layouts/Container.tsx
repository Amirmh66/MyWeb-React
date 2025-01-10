import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "../Authentication/ErrorFallback";
import PanelAdminSkeleton from "../Elements/PanelAdminSkeleton";
import HomePage from "../OrgSite/HomePage";
const LoadingText = lazy(() => import("../Elements/LoadingText"));
const AdminLayout = lazy(() => import('./AdminLayout'))
const UserLayout = lazy(() => import("./UserLayout"))
const AuthLayout = lazy(() => import("./AuthLayout"))
const AddProduct = lazy(() => import("../PanelAdmin/Pages/Product/AddProduct/AddProduct"))
const EditProduct = lazy(() => import("../PanelAdmin/Pages/Product/EditProduct/EditProduct"))
const AddUser = lazy(() => import("../PanelAdmin/Pages/Users/AddUser/AddUser"))
const EditUser = lazy(() => import("../PanelAdmin/Pages/Users/EditUser/EditUser"))
const MoreInfo = lazy(() => import("../PanelAdmin/Pages/Users/MoreInfo/MoreInfo"))
const Order = lazy(() => import("../PanelAdmin/Pages/Order/Order"))
const Dashboard = lazy(() => import("../PanelAdmin/Pages/Dashboard/Dashboard"))
const Users = lazy(() => import("../PanelAdmin/Pages/Users/User"))
const Leaderboard = lazy(() => import("../PanelAdmin/Pages/Leaderboard/Leaderboard"))
const Product = lazy(() => import("../PanelAdmin/Pages/Product/Product"))
const Categories = lazy(() => import("../PanelAdmin/Pages/Categories/Categories"))
const AddCategory = lazy(() => import("../PanelAdmin/Pages/Categories/AddCategory/AddCategory"))
const EditCategory = lazy(() => import("../PanelAdmin/Pages/Categories/EditCategory/EditCategory"))
const Roles = lazy(() => import("../PanelAdmin/Pages/Roles/Roles"))
const AddRole = lazy(() => import("../PanelAdmin/Pages/Roles/AddRoles/AddRole"))
const EditRole = lazy(() => import("../PanelAdmin/Pages/Roles/EditRoles/EditRole"))
const Brands = lazy(() => import("../PanelAdmin/Pages/Brands/Brands"))
const EditBrand = lazy(() => import("../PanelAdmin/Pages/Brands/EditBrand/EditBrand"))
const AddBrand = lazy(() => import("../PanelAdmin/Pages/Brands/AddBrand/AddBrand"))
const Types = lazy(() => import("../PanelAdmin/Pages/Types/Types"))
const AddType = lazy(() => import("../PanelAdmin/Pages/Types/AddType/AddType"))
const EditType = lazy(() => import("../PanelAdmin/Pages/Types/EditType/EditType"))
const ProductDetail = lazy(() => import("../OrgSite/Sections/Product/ProductDetail/ProductDetail"))
const PanelUser = lazy(() => import("../PanelUser/PanelUser"))
const Profile = lazy(() => import("../OrgSite/Sections/Profile/Profile"))
const RequireAuth = lazy(() => import("../Authentication/RequireAuth"))
const ShoppingCart = lazy(() => import("../OrgSite/Sections/ShoppingCart/ShoppingCart"));
const Login = lazy(() => import("../Authentication/Login/Login"))
const SignUp = lazy(() => import("../Authentication/SignUp/SignUp"))
const Error404 = lazy(() => import("../Authentication/unAuthorized/Error404"));
const ProductsLoadingSkeleton = lazy(() => import("../Elements/ProductsLoadingSkeleton"));

const Container = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
<HomePage />}>

          <Route path="/ProductDetail/:id" element={
            <Suspense fallback={<LoadingText />}>
              <UserLayout>
                <ProductDetail />
              </UserLayout>
            </Suspense>} />
        </Route>
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingText />}>
              <AuthLayout>
                <Login />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense>
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            </Suspense>
          }
        />
        <Route
          path="/notFound"
          element={
            <AuthLayout>
              <Error404 />
            </AuthLayout>
          }
        />
        <Route path="ShoppingCart" element={
          <Suspense fallback={<LoadingText />}>
            <UserLayout>
              <ShoppingCart />
            </UserLayout>
          </Suspense>} />

        <Route
          path="/PanelAdmin"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <RequireAuth requiredRole="admin">
                <Suspense fallback={<PanelAdminSkeleton />}>
                  <AdminLayout />
                </Suspense>
              </RequireAuth>
            </ErrorBoundary>
          }
        >
          <Route path="Dashboard" element={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense>
                <Dashboard />
              </Suspense>
            </ErrorBoundary>
          } />
          <Route path="Leaderboard" element={<Leaderboard />} />
          <Route path="Order" element={<Order />} />

          <Route path="Product" element={
            <Suspense fallback={<LoadingText />}>
              <Product />
            </Suspense>
          }>
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="EditProduct/:id" element={<EditProduct />} />
          </Route>

          <Route path="Roles" element={
            <Suspense fallback={<LoadingText />}>
              <Roles />
            </Suspense>
          }>
            <Route path="AddRole" element={<AddRole />} />
            <Route path="EditRole/:id" element={<EditRole />} />
          </Route>

          <Route path="Users" element={
            <Suspense fallback={<LoadingText />}>
              <Users />
            </Suspense>
          }>
            <Route path="AddUser" element={<AddUser />} />
            <Route path="EditUser/:id" element={<EditUser />} />
            <Route path="MoreInfoUser/:id" element={<MoreInfo />} />
          </Route>

          <Route path="Brands" element={
            <Suspense fallback={<LoadingText />}>
              <Brands />
            </Suspense>

          }>
            <Route path="AddBrand" element={<AddBrand />} />
            <Route path="EditBrand/:id" element={<EditBrand />} />
          </Route>

          <Route path="Types" element={
            <Suspense fallback={<LoadingText />}>
              <Types />
            </Suspense>
          }>
            <Route path="AddType" element={<AddType />} />
            <Route path="EditType/:id" element={<EditType />} />
          </Route>

          <Route path="Categories" element={
            <Suspense fallback={<LoadingText />}>
              <Categories />
            </Suspense>
          }>
            <Route path="AddCategory" element={<AddCategory />} />
            <Route path="EditCategory/:id" element={<EditCategory />} />
          </Route>
        </Route>

        <Route path="/Profile" element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingText />}>
              <UserLayout>
                <Profile />
              </UserLayout>
            </Suspense>
          </ErrorBoundary>
        } />

        <Route
          path="panelUser"
          element={
            <RequireAuth requiredRole="user">
              <Suspense fallback={<LoadingText />}>
                <UserLayout>
                  <PanelUser />
                </UserLayout>
              </Suspense>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter >
  );
}

export default Container;
