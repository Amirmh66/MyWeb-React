import { body } from "express-validator";
const validateProduct = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Product name must be between 3 and 200 characters.")
    .notEmpty()
    .withMessage("Product name is required.")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Product name can only contain letters and numbers."),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number.")
    .isFloat({ min: 0, max: 100000000 })
    .withMessage("Price must be between 0 and 100 million."),
  body("stock")
    .isInt({ min: 0, max: 100000 })
    .withMessage("Stock must be an integer between 0 and 100,000."),
  body("description")
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters.")
    .notEmpty()
    .withMessage("Description is required."),
  body("imageUrl")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Image URL must be at most 500 characters.")
    .isURL()
    .withMessage("Invalid image URL."),
  body("status")
    .isIn(["active", "inactive", "draft", "out_of_stock"])
    .withMessage(
      "Status must be one of: active, inactive, draft, or out of stock."
    ),
  body("category").optional().isMongoId().withMessage("Invalid category ID."),
  body("type").optional().isMongoId().withMessage("Invalid type ID."),
  body("brand").optional().isMongoId().withMessage("Invalid brand ID."),
];


export default validateProduct