import * as yup from "yup";

const validEmail = /^[a-zA-Z0-9._]+@gmail\.com$/;
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

const validateUser = yup.object().shape({
  fullName: yup.string().max(400).required("FullName is required"),
  userName: yup.string().max(45).required("UserName is required"),
  email: yup
    .string()
    .matches(validEmail, "Email format is not valid!")
    .email("Please enter a valid email address!")
    .max(150)
    .required("Please Enter Email"),
  phoneNumber: yup.number().nullable().optional(),
  password: yup.string().matches(passwordRules
    , "Password Must Be at Least 8 Characters long ,including uppercase, lowercase, a digit, and special character.")
    .min(7).required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "ConfirmPassword must match the Password")
    .optional(),
  role: yup.string().required("Please Select A Role"),
});
export default validateUser;
