import express from "express";
import {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteAllBlogs,
  getBlogBySlug,
  getTotalBlogs,
  getPublishedBlogs,
  getTotalAuthors,
  getTotalViews,
  getBlogById,
} from "../Controllers/BlogController.mjs";

import {
  setPublishedAt,
  calculateReadingTime,
  generateUniqueSlug,
} from "../Middleware/blogMiddleware.mjs";
import BlogValidation from "../Validators/blogValidator.mjs";

const router = express.Router();

router.get("/blogs/totalBlogs", getTotalBlogs);
router.get("/blogs/publishedBlogs", getPublishedBlogs);
router.get("/blogs/totalAuthors", getTotalAuthors);
router.get("/blogs/totalViews", getTotalViews);

router.get("/blogs", getBlog);
router.get("/blogs/:id", getBlogById);
router.get("/blogs/detail/:slug", getBlogBySlug);
router.post(
  "/blogs",
  calculateReadingTime,
  setPublishedAt,
  generateUniqueSlug,
  BlogValidation,
  createBlog
);
router.patch("/blogs/:id", setPublishedAt, updateBlog, BlogValidation);
router.delete("/blogs/delete/:id", deleteBlog);
router.delete("/blogs/deleteAll", deleteAllBlogs);

export default router;
