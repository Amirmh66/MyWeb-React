import "./Blog.css";

function Blog() {
  return (
    <>
      <div className="blogSec">
        
        <div className="blog">
          <div>
            <img
              srcSet="/Images/usaflag.jpeg"
              className="h-38 w-full rounded-md"
            />
          </div>

          <div className="pl-3 flex flex-col items-left justify-center gap-5">
            <p className="blog-Name">BlogName</p>
            <p className=" blog-Summary">SummaryDescription</p>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Blog;
