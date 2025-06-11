import { Outlet, useLocation } from 'react-router-dom'
import TypeList from './SectionInType/TypeList';

function Types() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/PanelAdmin/Types" ? (
        <>
          <TypeList />
        </>
      ) : (
        <Outlet />
      )}

    </>
  )
}
export default Types