import { Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
const Desktop = lazy(() => import("./pages/HomePage/Desktop/Desktop"));
const Mobile = lazy(() => import("./pages/HomePage/Mobile/Mobile"));
import { useDevice } from "../Context/DeviceContext";

function HomePage() {
  const deviceType = useDevice();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" ? (
        <>
          <Outlet />
        </>
      ) : (
        (() => {
          switch (deviceType) {

            case 'mobile':
              return <Suspense >
                <Mobile />
              </Suspense>

            case 'desktop':
              return <Suspense>
                <Desktop />
              </Suspense>

            default:
              return <Desktop />
          }
        })()
      )}
    </>
  );
}
export default HomePage;