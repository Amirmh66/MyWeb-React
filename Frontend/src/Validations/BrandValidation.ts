import { object, string, array } from "yup";
const validBrand = object().shape({
    name: string().max(35).required("Name Is Required!"),
    logoUrl: string().nullable().max(150).optional(),
    description: string().max(500).required(),
    createdAt: string().required("CreatedAt Is Required!"),
    types: array().required("Select at Least One Type"),
})
export default validBrand