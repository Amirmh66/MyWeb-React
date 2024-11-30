import * as yup from "yup";

const validTypeSchima = /^[A-Za-z/-]+$/
export const validType = yup.object().shape({
    typeName: yup.string().matches(validTypeSchima, "Only letters are allowed!").max(20).required("Field is required!"),
    description: yup.string().max(90).optional(),
});