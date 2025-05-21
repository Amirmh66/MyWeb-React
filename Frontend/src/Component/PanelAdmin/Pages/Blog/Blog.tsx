import ArticleCollection from "./SectionsInBlog/ArticleCollection";
import BlogAnalyticsView from "./SectionsInBlog/BlogAnalyticsView";
import SearchBox from "../../../Elements/SearchBox";
import { Outlet, useLocation } from "react-router-dom";

function Blog() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/PanelAdmin/Blogs" ? (
        <div className="flex flex-col gap-5 items-center">
          <BlogAnalyticsView />
          <SearchBox placeholderTxt="Serach here for blog..." />
          <ArticleCollection />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default Blog