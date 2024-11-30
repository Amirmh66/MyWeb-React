import * as yup from "yup";
const validEmail = /^[a-zA-Z0-9._]+@gmail\.com$/;

const validSignUp = yup.object().shape({
  userName: yup.string().required("Please Enter UserName"),
  email: yup
    .string()
    .matches(validEmail, "Email format is not valid!")
    .email("Please enter a valid email address!")
    .max(150)
    .required("Please Enter Email"),
  password: yup.string().min(7).required("Please Enter Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "ConfirmPassword must Match the Password!")
    .required("Please Enter ConfirmPassword"),
  role: yup.string().required(),
});

export default validSignUp;
