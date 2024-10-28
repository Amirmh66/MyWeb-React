interface Ichildren {
  children: JSX.Element;
}

function AuthLayout({ children }: Ichildren) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default AuthLayout;
