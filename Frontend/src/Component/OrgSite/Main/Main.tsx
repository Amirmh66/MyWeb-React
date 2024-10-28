import Border from "../../Elements/Border";
import Blog from "../Sections/Blog/Blog";
import Products from "../Sections/Product/Products";

function Main() {
  return (
    <>
      <main className="main">
      <Border name="Products"/>
        <Products />
        <Border name="Blogs"/>
        <Blog />
      </main>
    </>
  );
}

export default Main;
