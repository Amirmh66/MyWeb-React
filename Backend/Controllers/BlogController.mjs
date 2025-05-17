import Blog from "../Models/Blog.mjs";

export const getBlog = async (req, res) => {
  try {
    await Blog.find({ isPublished: false })
      .sort({ publishedAt: -1 })
      .limit(3)
      .select("title excerpt coverImage slug publishedAt")
      .populate("author", "name")
      .then((latestBlogs) => {
        res.status(200).json({
          status: "success",
          data: {
            blogs: latestBlogs,
          },
        });
      });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error while get Blogs",
    });
  }
};
export const createBlog = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        status: "fail",
        message: "",
      });
    }
    if (!req.body.slug) {
      req.body.slug = req.body.title.replace(/[^a-z0-9]/gi, "-").toLowerCase();
    }

    const newBlog = await Blog.create({
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      data: {
        blog: newBlog,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "This slug has already been used.",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Error in creating the blog.",
      error: err.message,
    });
  }
};
export const updateBlog = async (req, res) => {};
export const deleteBlog = async (req, res) => {};
export const deleteAllBlogs = async (req, res) => {
  try {
    await Blog.deleteMany({}).then((result) => {
      res.status(200).json({
        status: "success",
        data: {
          deletedCount: result.deletedCount,
        },
        message: `All ${result.deleteCount} blogs have been deleted!`,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error While Delete Blogs",
      error: error.message,
    });
  }
};
