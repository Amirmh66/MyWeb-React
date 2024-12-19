import Logo from "../../Elements/Logo";

function Title() {
  return (
    <>
      <div className="title">
        <div className="flex items-center gap-2">
          <Logo />
          <h1>MyPanel</h1>
        </div>
      </div>
    </>
  );
}

export default Title;
