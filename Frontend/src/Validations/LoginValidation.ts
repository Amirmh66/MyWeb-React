import { object, string } from "yup"
const validEmail = /^[a-zA-Z0-9._]+@gmail\.com$/;
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
const validLogin = object().shape({
  email: string()
    .matches(validEmail, "Email format is not valid!")
    .email("Please enter a valid email address!")
    .max(130)
    .required(),
  password: string().matches(passwordRules, "Password Must Be at Least 8 Characters long ,including uppercase, lowercase, a digit, and special character.")
    .min(8).required(),
})
export default validLogin