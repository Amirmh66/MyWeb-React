import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "../Authentication/ErrorFallback";
import HomePage from "../OrgSite/HomePage";
const BlogEditor = lazy(() => import("../PanelAdmin/Pages/Blog/SectionsInBlog/BlogEditor"))
const BlogViewer = lazy(() => import("../PanelAdmin/Pages/Blog/SectionsInBlog/BlogViewer"))
const BlogComposer = lazy(() => import("../PanelAdmin/Pages/Blog/SectionsInBlog/BlogComposer"))
const ProductCollection = lazy(() => import("../OrgSite/pages/ProductCollection/ProductCollection"));
const PanelAdminSkeleton = lazy(() => import("../Elements/PanelAdminSkeleton"));
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
const AddProduct = lazy(() => import("../PanelAdmin/Pages/Product/SectionInProduct/AddProduct"))
const EditProduct = lazy(() => import("../PanelAdmin/Pages/Product/SectionInProduct/EditProduct"))
const AddUser = lazy(() => import("../PanelAdmin/Pages/Users/SectionInUsers/AddUser"))
const EditUser = lazy(() => import("../PanelAdmin/Pages/Users/SectionInUsers/EditUser"))
const MoreInfo = lazy(() => import("../PanelAdmin/Pages/Users/SectionInUsers/MoreInfo"))
const Order = lazy(() => import("../PanelAdmin/Pages/Order/Order"))
const Dashboard = lazy(() => import("../PanelAdmin/Pages/Dashboard/Dashboard"))
const Users = lazy(() => import("../PanelAdmin/Pages/Users/User"))
const Leaderboard = lazy(() => import("../PanelAdmin/Pages/Leaderboard/Leaderboard"))
const Product = lazy(() => import("../PanelAdmin/Pages/Product/Product"))
const Categories = lazy(() => import("../PanelAdmin/Pages/Categories/Categories"))
const AddCategory = lazy(() => import("../PanelAdmin/Pages/Categories/SectionInCategories/CreateCategory"))
const EditCategory = lazy(() => import("../PanelAdmin/Pages/Categories/SectionInCategories/EditCategory"))
const Roles = lazy(() => import("../PanelAdmin/Pages/Roles/Roles"))
const AddRole = lazy(() => import("../PanelAdmin/Pages/Roles/SectionInForm/AddRole"))
const EditRole = lazy(() => import("../PanelAdmin/Pages/Roles/SectionInForm/EditRole"))
const Brands = lazy(() => import("../PanelAdmin/Pages/Brands/Brands"))
const EditBrand = lazy(() => import("../PanelAdmin/Pages/Brands/SectionInBrand/EditBrand"))
const CreateBrand = lazy(() => import("../PanelAdmin/Pages/Brands/SectionInBrand/CreateBrand"))
const Types = lazy(() => import("../PanelAdmin/Pages/Types/Types"))
const AddType = lazy(() => import("../PanelAdmin/Pages/Types/SectionInType/AddType"))
const EditType = lazy(() => import("../PanelAdmin/Pages/Types/SectionInType/EditType"))
const Blog = lazy(() => import("../PanelAdmin/Pages/Blog/Blog"))
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

        <Route path="/" element={
          <Suspense>
            <UserLayout>
              <HomePage />
            </UserLayout>
          </Suspense>
        }>

          <Route path="/ProductDetail/:id" element={
            <Suspense fallback={<LoadingText />}>
              <UserLayout>
                <ProductDetail />
              </UserLayout>
            </Suspense>} />
        </Route>

        <Route path="/productCollection" element={
          <Suspense>
            <UserLayout>
              <ProductCollection />
            </UserLayout>
          </Suspense>
        }>

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
            <Route path="AddProduct" element={
              <Suspense fallback={<LoadingText />}>
                <AddProduct />
              </Suspense>
            } />
            <Route path="EditProduct/:id" element={
              <Suspense fallback={<LoadingText />}>
                <EditProduct />
              </Suspense>
            } />
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
            <Route path="CreateBrand" element={
              <Suspense fallback={<LoadingText />}>
                <CreateBrand />
              </Suspense>
            } />

            <Route path="EditBrand/:id" element={
              <Suspense fallback={<LoadingText />}>
                <EditBrand />
              </Suspense>
            } />
          </Route>

          <Route path="Types" element={
            <Suspense fallback={<LoadingText />}>
              <Types />
            </Suspense>
          }>
            <Route path="AddType" element={<AddType />} />
            <Route path="EditType/:id" element={<EditType />} />
          </Route>

          <Route path="Blogs" element={
            <Suspense fallback={<LoadingText />}>
              <Blog />
            </Suspense>
          }>

            <Route path="BlogComposer" element={
              <Suspense fallback={<LoadingText />}>
                <BlogComposer />
              </Suspense>
            } />

            <Route path="edit/:id" element={
              <Suspense fallback={<LoadingText />}>
                <BlogEditor />
              </Suspense>
            } />

            <Route path="detail/:slug" element={
              <Suspense fallback={<LoadingText />}>
                <BlogViewer />
              </Suspense>
            } />

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