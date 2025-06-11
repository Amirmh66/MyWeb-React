import { object, string } from "yup";
const validationCategory = object().shape({
  name: string().trim().min(3).max(50).required(),
  description: string().trim().min(10).max(500).required(),
  });
export default validationCategory;
