import { string, object, ref } from "yup"
const validEmail = /^[a-zA-Z0-9._]+@gmail\.com$/;
const validSignUp = object().shape({
  userName: string().required(),
  email: string().matches(validEmail, "Email format is not valid!").email("Please enter a valid email address!").max(150)
    .required("Please Enter Email"),
  password: string().min(7).required(),
  confirmPassword: string().oneOf([ref("password")], "ConfirmPassword must Match the Password!").required(),
});
export default validSignUp