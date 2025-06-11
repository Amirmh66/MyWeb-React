import { useState } from "react"
import { useNavigate } from "react-router-dom";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Form from '../Shared/From';
import { IBrand } from "../../../../../Types/Interfaces";
function CreateBrand() {
    const [isLoading, setIsLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<any>();
    const [generalError, setGeneralError] = useState<string | null>(null)
    const redirect = useNavigate();

    const sendBrandToServer = async (data: IBrand) => {
        setIsLoading(true);
        setGeneralError(null)
        setFieldErrors(null)
        try {
            const response = await fetch(apiRoutes.createBrand, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                redirect("/PanelAdmin/Brands");
            } else {
                const errorData = await response.json()
                if (response.status === 400 && errorData.errors) {
                    const newErrors: { [key: string]: string } = {};
                    errorData.errors.forEach((err: any) => {
                        newErrors[err.path] = err.msg
                    })
                    setFieldErrors(newErrors)
                } else if (response.status === 409) {
                    setGeneralError(errorData.message
                        || "A brand with this name already exists.")
                } else if (response.status === 500) {
                    setGeneralError("Internal Server Error! Please try again later.")
                } else {
                    setGeneralError(errorData.message || "An unexpected error occurred.")
                }
            }
        } catch (error: any) {
            setGeneralError(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {fieldErrors}
            <Form onSubmit={sendBrandToServer} error={generalError} isEditMode={false} isLoading={isLoading} />
        </>
    );
}
export default CreateBrand
