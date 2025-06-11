import { body, validationResult } from 'express-validator'

const validateSignup = [
  body('username')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers')
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long'),

  body('email')
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password and confirmation password must match');
      }
      return true;
    }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validateSignup