import Blog from "../Models/Blog.mjs";

export const setPublshedAt = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  try {
    if (!blog) {
      return res.status(404).json({
        message: "",
      });
    }
    if (
      blog.isModified("isPublished") &&
      req.body.isPublished &&
      !blog.publishedAt
    ) {
      blog.publishedAt = new Date();
      await blog.save();
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "",
    });
  }
};

export const calculateReadingTime = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        messgage: "",
      });
    }
    if (blog.isModified("content")) {
      const text = req.body.content;
      const wordsPerMinute = 200;
      const wordCount = text.split(/\s/g).length;
      blog.readingTime = Math.ceil(wordCount / wordsPerMinute);
      await blog.save();
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error in middleware calculateReadingTime!",
    });
  }
};
