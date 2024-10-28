import * as yup from "yup";


const validProduct = yup.object().shape({
  name: yup.string().required("Name is a required"),
  stock: yup.number().positive().integer().required("Stock is a required"),
  price: yup.number().positive().integer().required("Price is a required"),
  summary: yup.string().min(2).max(20).required("Summary Description is required"),
  description: yup.string().required("Description is a required"),
  category: yup.string().required("Please Select A Category!"),
});
export default validProduct;
