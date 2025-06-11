import { Outlet, useLocation } from "react-router-dom"
import ProductList from "./SectionInProduct/ProductList";

function Product() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/PanelAdmin/Product" ? (
        <>
          <ProductList />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Product