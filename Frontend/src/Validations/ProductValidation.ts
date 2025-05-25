import { object, string, number, array } from "yup"
const validProduct = object().shape({
  name: string().max(50).required(),
  stock: number().positive().integer().required(),
  price: number().positive().integer().required(),
  description: string().required(),
  categoryId: array().optional(),
  typeId: array().optional(),
  brandId: array().optional(),
})
export default validProduct