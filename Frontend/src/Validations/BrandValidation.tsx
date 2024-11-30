import * as yup from "yup";

const validBrand = yup.object().shape({
    name: yup.string().max(35).required("Name Is Required!"),
    logoUrl: yup.string().nullable().max(150).optional(),
    description: yup.string().max(500).required(),
    createdAt: yup.string().required("CreatedAt Is Required!"),
    types: yup.array().required("Select at Least One Type"),
});
export default validBrand;
