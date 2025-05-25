import { object, string } from "yup";
const validCategory = object().shape({
  name: string().max(45).required(),
  description: string().max(90).optional(),
});
export default validCategory;
