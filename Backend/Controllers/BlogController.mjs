import Blog from "../Models/Blog.mjs";

export const getBlog = async (req, res) => {
  try {
    const sortBlog = req.query.sort.toLowerCase();
    if (sortBlog === "latest") {
      await Blog.find({ isPublished: true })
        .sort({ publishedAt: -1 })
        .limit(3)
        .select("title excerpt coverImage slug publishedAt")
        .populate("author", "name")
        .then((result) => {
          res.status(200).json({
            status: "success",
            data: {
              blogs: result,
            },
          });
        });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error while get Blogs",
    });
  }
};
export const getBlogBySlug = async (req, res) => {
  try {
    const blogSlug = req.params.slug;
    await Blog.findOne({ slug: blogSlug })
      .populate("author", "name email")
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            status: "fail",
            message: "Blog not found",
          });
        }
        if (result.status !== "published") {
          return res.status(403).json({
            status: "fail",
            messsage: "Access denied",
          });
        }
        res.status(200).json({
          status: "success",
          data: {
            result,
          },
        });
      });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        status: "fail",
        message: "Invalid blog ID",
      });
    }
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};
export const createBlog = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        status: "fail",
        message: "Title and content are required",
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
export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogContent = req.body;
    if (blogContent && blogId) {
      if (blogContent.title.length < 10 || blogContent.title.length > 100) {
        return res.status(400).json({
          stasu: "error",
          message: "The title must be between 10 and 100 characters!",
        });
      } else if (
        blogContent.content === null ||
        undefined ||
        "" ||
        blogContent.content.length < 0
      ) {
        return res.status(400).json({
          stasu: "error",
          message: "The blog content cannot be empty!",
        });
      }
      const blog = await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $set: blogContent }
      );
      if (!blog) {
        return res.status(404).json({
          status: "error",
          message: "Blog not found",
        });
      }

      res.status(200).json({
        status: "success",
        data: { blog },
        message: "Blog updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error in editing the blog",
      error: err.message,
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({
        status: "error",
        message: "Blog not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error While deleting blog",
      error: err.message,
    });
  }
};
export const deleteAllBlogs = async (req, res) => {
  try {
    await Blog.deleteMany({}).then((result) => {
      res.status(200).json({
        status: "success",
        data: {
          deletedCount: result.deletedCount,
        },
        message: `All ${result.deletedCount} blogs have been deleted!`,
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



