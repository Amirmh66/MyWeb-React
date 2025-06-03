import { body } from "express-validator";

const brandValidationRules = [
  body("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Brand name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Only English letters are allowed"),
  body("logoUrl")
    .notEmpty()
    .isString()
    .withMessage("Logo URL must be a string")
    .trim()
    .isURL()
    .withMessage("Invalid Logo URL format")
    .isLength({ max: 200 })
    .withMessage("Logo URL must be at most 200 characters"),
  body("description")
    .notEmpty()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("websiteUrl")
    .notEmpty()
    .isLength({ max: 200 })
    .withMessage("Website URL must be at most 200 characters"),
  body("countryOfOrigin")
    .notEmpty()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Country of Origin must be at most 50 characters "),
  body("establishedYear")
    .notEmpty()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(
      `Established year must be a number between 1000 and ${new Date().getFullYear()}`
    ),
];

export default brandValidationRules;
