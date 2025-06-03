import { body } from "express-validator";

const validateUser = [
  body("fullName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Full name must be at most 100 characters."),

  body("userName")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters.")
    .notEmpty()
    .withMessage("Username is required.")
    .isLowercase()
    .withMessage("Username must be lowercase.")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Username can only contain letters and numbers."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/
    )
    .withMessage(
      "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),

  body("phoneNumber")
    .optional()
    .trim()
    .matches(/^[0-9]{11}$/)
    .withMessage("Phone number must be exactly 11 digits."),

  body("imageUrl")
    .optional()
    .trim()
    .isURL()
    .withMessage("Invalid image URL format."),

  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isMongoId()
    .withMessage("Invalid role ID."),

  body("favorites")
    .optional()
    .isArray()
    .withMessage("Favorites must be an array.")
    .custom((value) => value.every((id) => /^[0-9a-fA-F]{24}$/.test(id)))
    .withMessage("Each favorite item must be a valid MongoDB ObjectId."),
];

export default validateUser;
