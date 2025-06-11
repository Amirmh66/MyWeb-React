import { object, string, number } from "yup";
const validationProduct = object().shape({
  name: string().min(3).max(50).trim().required(),
  stock: number().min(0).positive().integer().required(),
  price: number().min(1).positive().integer().required(),
  description: string().min(20).max(500).trim().required(),
  imageUrl: string().required(),
});
export default validationProduct;
