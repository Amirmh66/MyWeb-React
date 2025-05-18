import express from "express";
import {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteAllBlogs
} from "../Controllers/BlogController.mjs";

const router = express.Router();

router.get("/latestBlogs", getBlog);
router.post("/newBlog", createBlog);
router.patch("/updateBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);
router.delete("/deleteAllBlogs",deleteAllBlogs);

export default router