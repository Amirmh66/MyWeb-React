import NavbarMobile from "../Elements/NavbarMobile";

function UserLayout({children}:any) {
  return (
    <>
      <div>{children}</div>
      
      <NavbarMobile />
    </>
  );
}

export default UserLayout;
