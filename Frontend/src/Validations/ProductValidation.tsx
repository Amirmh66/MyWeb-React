import * as yup from "yup";


const validProduct = yup.object().shape({
  name: yup.string().max(50).required("Name is a required"),
  stock: yup.number().positive().integer().required("Stock is a required"),
  price: yup.number().positive().integer().required("Price is a required"),
  description: yup.string().required("Description is a required"),
  categoryId: yup.array().optional(),
  typeId: yup.array().optional(),
  brandId: yup.array().optional(),
});
export default validProduct;
