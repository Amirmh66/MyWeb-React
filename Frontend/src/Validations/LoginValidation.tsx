import * as yup from "yup";

const validEmail = /^[a-zA-Z0-9._]+@gmail\.com$/;
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;



const validLogin = yup.object().shape({
  email: yup
    .string()
    .matches(validEmail, "Email format is not valid!")
    .email("Please enter a valid email address!")
    .max(130)
    .required("Please Enter Email"),
  password: yup.string().matches(passwordRules
    , "Password Must Be at Least 8 Characters long ,including uppercase, lowercase, a digit, and special character.")
    .min(8).required("Password is required!"),
});
export default validLogin;
