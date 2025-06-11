import { object, string, number } from "yup";
const validationBrand = object().shape({
  name: string()
    .max(2)
    .max(100)
    .matches(/^[a-zA-Z]+$/, "Only English letters are allowed")
    .required(),
  logoUrl: string().trim().url().max(200).required(),
  description: string().max(500).required().trim().min(10).max(500),
  websiteUrl: string().required().trim().url().max(200),
  countryOfOrigin: string().required().trim().max(50),
  establishedYear: number().required().min(1000).max(new Date().getFullYear()),
});
export default validationBrand;
