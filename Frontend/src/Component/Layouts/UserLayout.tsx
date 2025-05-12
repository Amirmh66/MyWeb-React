import NavbarMobile from "../OrgSite/pages/HomePage/Mobile/Sections/NavbarMobile";
import "../GlobalStyle/Glogbal.css";

function UserLayout({ children }: any) {
  return (
    <>
    <main className="userLayoutBody">
      <div>{children}</div>
    </main>
    </>
  );
}

export default UserLayout;
