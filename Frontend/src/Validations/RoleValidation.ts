import { string, object } from "yup";

const roleValidation = object().shape({
  name: string().min(3).max(50).trim().required(),
});

export default roleValidation;
