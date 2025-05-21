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
} from "../Controllers/BlogController.mjs";

import {
  setPublishedAt,
  calculateReadingTime,
} from "../Middleware/blogMiddleware.mjs";

const router = express.Router();

router.get("/blogs/totalBlogs", getTotalBlogs);
router.get("/blogs/publishedBlogs", getPublishedBlogs);
router.get("/blogs/totalAuthors", getTotalAuthors);
router.get("/blogs/totalViews", getTotalViews);

router.get("/blogs", getBlog);
router.get("/blogs/:slug", getBlogBySlug);
router.post("/blogs", calculateReadingTime, setPublishedAt, createBlog);
router.patch("/blogs/:id", setPublishedAt, updateBlog);
router.delete("/blogs/delete/:id", deleteBlog);
router.delete("/blogs/deleteAll", deleteAllBlogs);

export default router;
