import { string, object } from "yup";
const validTypeSchima = /^[A-Za-z/-\s]+$/;
const validationType = object().shape({
  name: string()
    .matches(validTypeSchima, "Only letters are allowed!")
    .max(50)
    .min(3)
    .trim()
    .required(),
  description: string().min(3).max(90).required(),
  imageUrl: string().max(200).required(),
});
export default validationType;
