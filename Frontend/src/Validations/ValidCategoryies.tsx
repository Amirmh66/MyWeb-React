import * as yup from "yup";

export const validCategory = yup.object().shape({
  name: yup.string().max(45).required("Name is required"),
  description: yup.string().max(90).optional(),
});
