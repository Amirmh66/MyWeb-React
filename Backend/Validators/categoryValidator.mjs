import { body } from "express-validator";

const validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Category name must be between 3 and 50 characters.")
    .notEmpty()
    .withMessage("Category name is required.")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Category name can only contain letters and numbers."),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters."),

  body("types")
    .optional()
    .isArray()
    .withMessage("Types must be an array.")
    .custom((value) => value.every((id) => /^[0-9a-fA-F]{24}$/.test(id)))
    .withMessage("Each type item must be a valid MongoDB ObjectId."),

  body("imageUrl")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Image URL must be at most 200 characters.")
    .isURL()
    .withMessage("Invalid image URL."),
];


export default validateCategory; 