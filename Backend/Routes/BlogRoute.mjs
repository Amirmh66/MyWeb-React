import express from "express";
import {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteAllBlogs,
  getBlogBySlug,
} from "../Controllers/BlogController.mjs";

import {
  setPublishedAt,
  calculateReadingTime,
} from "../Middleware/blogMiddleware.mjs";

const router = express.Router();

// query
router.get("/blogs", getBlog);
// params
router.get("/blogs/:slug", getBlogBySlug);
router.post("/blogs", calculateReadingTime, setPublishedAt, createBlog);
router.patch("/blogs/:id", setPublishedAt, updateBlog);
router.delete("/blogs/delete/:id", deleteBlog);
router.delete("/blogs/deleteAll", deleteAllBlogs);

export default router;
