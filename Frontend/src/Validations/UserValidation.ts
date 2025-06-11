import { string, object, ref } from "yup";
const validEmail = /^[a-zA-Z0-9._]+@gmail\.com$/;
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
const validateUser = object().shape({
  fullName: string().max(400).required(),
  email: string()
    .matches(validEmail, "Email format is not valid!")
    .email("Please enter a valid email address!")
    .max(150)
    .required(),
  phoneNumber: string().required().test({
    name: "is-valid-phone-format",
    test: (value) => {
      return /^[0-9]{11}$/.test(value);
    },
    message:
      "Phone number must be exactly 11 digits and contain only numbers (e.g., 09123456789).",
  }),
  password: string()
    .matches(
      passwordRules,
      "Password Must Be at Least 8 Characters long ,including uppercase, lowercase, a digit, and special character."
    )
    .min(7)
    .required(),
  confirmPassword: string()
    .oneOf([ref("password")], "ConfirmPassword must match the Password")
    .required(),
  role: string().required(),
});

export default validateUser;
