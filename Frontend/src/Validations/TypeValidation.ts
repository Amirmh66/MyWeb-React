import { string, object } from "yup";
const validTypeSchima = /^[A-Za-z/-]+$/
const validationType = object().shape({
    typeName: string().matches(validTypeSchima, "Only letters are allowed!").max(20).required(),
    description: string().max(90).optional(),
})
export default validationType