import * as yup from "yup";

const validSignUp = yup.object().shape({
  userName: yup.string().required("Please Enter UserName"),
  email: yup
    .string()
    .email("Please Enter a valid Email!")
    .required("Plaese Enter Email"),
  password: yup.string().min(7).required("Please Enter Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "ConfirmPassword must Match the Password!")
    .required("Please Enter ConfirmPassword"),
  role: yup.string().required(),
});

export default validSignUp
