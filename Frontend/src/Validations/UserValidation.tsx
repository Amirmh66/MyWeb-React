import * as yup from "yup";

const passwordRules = "/^(?=.*/d){?=.*[a-z]}(?=.*[A-Z]).{5,}$/";
// min 5 characcters, 1 upper case letter, 1 lower case letter , 1 numeric digit.

const validateUser = yup.object().shape({
  fullName: yup.string().max(400).required("FullName is required"),
  userName: yup.string().max(45).required("UserName is required"),
  email: yup.string().max(200).required("Email is required"),
  phoneNumber: yup.number().nullable().optional(),
  password: yup.string().min(7).optional(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "ConfirmPassword must match the Password")
    .optional(),
  role: yup.string().required("Please Select A Role"),
});
export default validateUser;
