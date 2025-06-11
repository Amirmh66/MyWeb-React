import { Outlet, useLocation } from "react-router-dom"
import CategoriesList from "./SectionInCategories/CategoriesList"
function Categories() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/PanelAdmin/Categories" ? (
        <>
          <CategoriesList />
        </>
      ) : (
        <Outlet />
      )}

    </>
  )
}
export default Categories