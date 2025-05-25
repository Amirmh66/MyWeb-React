import { string, object, ref, number } from "yup";
const validEmail = /^[a-zA-Z0-9._]+@gmail\.com$/;
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
const validateUser = object().shape({
  fullName: string().max(400).required("FullName is required"),
  userName: string().max(45).required("UserName is required"),
  email: string()
    .matches(validEmail, "Email format is not valid!")
    .email("Please enter a valid email address!")
    .max(150)
    .required("Please Enter Email"),
  phoneNumber: number().nullable().optional(),
  password: string()
    .matches(
      passwordRules,
      "Password Must Be at Least 8 Characters long ,including uppercase, lowercase, a digit, and special character."
    )
    .min(7)
    .required("Password is required!"),
  confirmPassword: string()
    .oneOf([ref("password")], "ConfirmPassword must match the Password")
    .optional(),
  role: string().required("Please Select A Role"),
});
export default validateUser;
