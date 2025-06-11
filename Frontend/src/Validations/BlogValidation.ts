import { object, string, boolean } from "yup";
const validationBlog = object().shape({
  title: string().max(70).min(20).required().trim(),
  content: string().max(15000).min(500).required(),
  excerpt: string().max(200).min(50).required(),
  coverImage: string().max(150).required(),
  isPublished: boolean().required(),
});
export default validationBlog;
