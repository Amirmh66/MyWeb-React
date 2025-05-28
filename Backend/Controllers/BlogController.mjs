import Blog from "../Models/Blog.mjs";

export const getBlog = async (req, res) => {
  try {
    const sortQuery = req.query.sort
      ? req.query.sort.toLowerCase()
      : "date-desc";
    let sortBy = {};
    if (sortQuery === "date-desc") {
      sortBy = { publishedAt: -1 };
    } else if (sortQuery === "date-asc") {
      sortBy = { publishedAt: 1 };
    } else if (sortQuery === "views-desc") {
      sortBy = { views: -1 };
    } else {
      sortBy = { views: 1 };
    }

    await Blog.find({ isPublished: true })
      .sort(sortBy)
      .limit(10)
      .select("title coverImage publishedAt status slug")
      .populate("author", "fullName")
      .then((result) => {
        res.status(200).json({
          status: "success",
          result,
          sort: sortQuery,
        });
      });
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
      .select(
        "title content excerpt coverImage author status publishedAt updatedAt createdAt readingTime"
      )
      .populate("author", "name email")
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            status: "fail",
            message: "Blog not found",
          });
        }
        res.status(200).json({
          status: "success",
          result,
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
export const getBlogById = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not Found",
      });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const createBlog = async (req, res) => {
  try {
    const { title, slug, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        status: "fail",
        message: "Title and content are required",
      });
    }
    if (!slug) {
      res.status(500).json({
        status: "error",
        message: "Internal error: Slug generation failed!",
      });
    }
    await Blog.create({
      ...req.body,
    });
    res.status(201).json("success");
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
      if (blogContent.title.length < 20 || blogContent.title.length > 70) {
        return res.status(400).json({
          stasu: "error",
          message: "The title must be between 20 and 70 characters!",
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
export const getTotalBlogs = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    res.status(200).json(totalBlogs);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error while send total Blog!",
    });
  }
};
export const getPublishedBlogs = async (req, res) => {
  try {
    const publishedBlogs = await Blog.countDocuments({ isPublished: true });
    res.json(publishedBlogs);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error while send published Blogs!",
    });
  }
};
export const getTotalAuthors = async (req, res) => {
  try {
    const distincAuthor = await Blog.distinct("author");
    const totalAuthors = distincAuthor.length;
    res.json(totalAuthors);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error while send total Authors!",
    });
  }
};
export const getTotalViews = async (req, res) => {
  try {
    const totalViewsResult = await Blog.aggregate([
      {
        $group: {
          _id: null,
          totalViews: {
            $sum: "$views",
          },
        },
      },
    ]);
    const totalViews =
      totalViewsResult.length > 0 ? totalViewsResult[0].totalViews : 0;
    res.status(200).json(totalViews);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error while send Total Views!",
    });
  }
};
