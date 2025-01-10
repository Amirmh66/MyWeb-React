import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";

function HomePage() {
  const location = useLocation(); 
  return (
    <>
      {location.pathname !== "/" ? (
        <div>
          <Outlet />
          <Footer />
        </div>
      ) : (
        <div>
          <Header />
          <Main />
          <Footer /> 
        </div>
      )}
    </>
  );
}
export default HomePage;