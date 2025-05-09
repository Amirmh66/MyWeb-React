import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "../Authentication/ErrorFallback";
import HomePage from "../OrgSite/HomePage";
import PanelAdminSkeleton from "../Elements/PanelAdminSkeleton";
const SEOSetting = lazy(() => import("../PanelAdmin/Pages/Setting/SEOSetting/SEOSetting"));
const APISetting = lazy(() => import("../PanelAdmin/Pages/Setting/APISetting/APISetting"))
const Notification = lazy(() => import("../PanelAdmin/Pages/Setting/NotificationSetting/Notification"));
const DeliverySetting = lazy(() => import("../PanelAdmin/Pages/Setting/DeliverySetting/DeliverySetting"))
const BackUpsSetting = lazy(() => import("../PanelAdmin/Pages/Setting/BackUpsSetting/BackUpsSetting"))
const SecuritySetting = lazy(() => import("../PanelAdmin/Pages/Setting/SecuritySetting/SecuritySetting"));
const Setting = lazy(() => import("../PanelAdmin/Pages/Setting/Setting"));
const StoreSetting = lazy(() => import("../PanelAdmin/Pages/Setting/StoreSetting/StoreSetting"));
const AppearanceSetting = lazy(() => import("../PanelAdmin/Pages/Setting/AppearanceSetting/AppearanceSetting"));
const AdminProfile = lazy(() => import("../PanelAdmin/Pages/AdminProfile/AdminProfile"));
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
const ProductDetail = lazy(() => import("../OrgSite/pages/Product/ProductDetail/ProductDetail"))
const PanelUser = lazy(() => import("../PanelUser/PanelUser"))
const Profile = lazy(() => import("../OrgSite/pages/UserProfile/Profile"))
const RequireAuth = lazy(() => import("../Authentication/RequireAuth"))
const ShoppingCart = lazy(() => import("../OrgSite/pages/ShoppingCart/ShoppingCart"));

const Login = lazy(() => import("../Authentication/Login/Login"))
const SignUp = lazy(() => import("../Authentication/SignUp/SignUp"))
const Error404 = lazy(() => import("../Authentication/unAuthorized/Error404"));

const Container = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>

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
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingText />}>
                <AuthLayout>
                  <Login />
                </AuthLayout>
              </Suspense>
            </ErrorBoundary>
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
              <RequireAuth requiredRole="admin" >
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

          <Route path="AdminProfile" element={
            <Suspense fallback={<LoadingText />}>
              <AdminProfile />
            </Suspense>
          } />

          <Route path="Setting" element={
            <Suspense fallback={<LoadingText />}>
              <Setting />
            </Suspense>
          }>
            <Route path="Store" element={
              <Suspense fallback={<LoadingText />}>
                <StoreSetting />
              </Suspense>
            } />
            <Route path="Theme&Design" element={
              <Suspense fallback={<LoadingText />}>
                <AppearanceSetting />
              </Suspense>
            } />

            <Route path="Theme&Design" element={
              <Suspense fallback={<LoadingText />}>
                <AppearanceSetting />
              </Suspense>
            } />

            <Route path="SEO" element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingText />}>
                  <SEOSetting />
                </Suspense>
              </ErrorBoundary>
            } />

            <Route path="Security" element={
              <Suspense fallback={<LoadingText />}>
                <SecuritySetting />
              </Suspense>
            } />

            <Route path="API" element={
              <Suspense fallback={<LoadingText />}>
                <APISetting />
              </Suspense>
            } />

            <Route path="Notification" element={
              <Suspense fallback={<LoadingText />}>
                <Notification />
              </Suspense>
            } />

            <Route path="Delivery" element={
              <Suspense fallback={<LoadingText />}>
                <DeliverySetting />
              </Suspense>
            } />

            <Route path="BackUps" element={
              <Suspense fallback={<LoadingText />}>
                <BackUpsSetting />
              </Suspense>
            } />

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