import { Outlet, useLocation } from "react-router-dom"
import ListOfBrand from "./SectionInBrand/ListOfBrand"

function Brands() {
  const location = useLocation()
  return (
    <>
      {location.pathname === "/PanelAdmin/Brands" ? (
        <>
          <ListOfBrand />
        </>
      ) : (
        <Outlet />
      )}
    </>
  )
}
export default Brands