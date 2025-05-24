import Blog from "../Models/Blog.mjs";
export const setPublishedAt = async (req, res, next) => {
  const isPublished = req.body.isPublished;
  const publishedAt = req.body.publishedAt;

  if (isPublished) {
    if (!publishedAt) {
      req.body.publishedAt = new Date();
      req.body.status = "published";
    }
  } else if (!isPublished) {
    req.body.publishedAt = null;
    req.body.status = "draft";
  }
  next();
};
export const calculateReadingTime = async (req, res, next) => {
  if (!req.body.content || typeof req.body.content !== "string") {
    return next();
  }
  if (req.body.content) {
    const wordPerMinute = 200;
    const wordCount = req.body.content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / wordPerMinute));
    req.body.readingTime = readingTime;
    next();
  }
};
export const generateUniqueSlug = async (req, res, next) => {
  let baseSlug = req.body.title
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/[^\w-]+/g, "");
  let slug = baseSlug;
  let counter = 1;
  try {
    while (await Blog.findOne({ slug: slug })) {
      slugUnique = `${baseSlug}-${counter}`;
      counter++;
    }
    req.body.slug = slug;
    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while generation slug!",
    });
  }
};
