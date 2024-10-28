import * as yup from "yup";
const validLogin = yup.object().shape({
  email: yup.string().max(130).required("Please Enter Email"),
  password: yup.string().min(8).required("Please Enter Password"),
});
export default validLogin;
