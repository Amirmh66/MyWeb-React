import { body } from "express-validator";

const BlogValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 20, max: 70 })
    .withMessage("Title must be between 20 and 70 characters long"),
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 500, max: 15000 })
    .withMessage("Content must be at least 500 characters long"),
  body("excerpt")
    .notEmpty()
    .withMessage("Excerpt is required")
    .isLength({ min: 50, max: 200 })
    .withMessage("Excerpt cannot exceed 200 characters"),
  body("coverImage")
    .optional()
    .isURL()
    .withMessage("CoverImage must be a valid URL"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["published", "draft", "pending", "archived"])
    .withMessage('Status must be "Published", "Draft", "Pending", "Archived"'),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be a boolean value"),
];

export default BlogValidation;
