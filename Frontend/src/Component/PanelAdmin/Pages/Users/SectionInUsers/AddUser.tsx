import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Notification from "../../../../Elements/Notification";
import Form from '../Shared/Form'

function AddUser() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fieldErrors, setFieldErrors] = useState<any>();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const redirect = useNavigate();

  //#region OnSubmit
  const onSave = async (values: any) => {
    setIsLoading(true)
    try {
      const response = await fetch(apiRoutes.createUser, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(values)
      })

      if (response.ok)
        setShowConfirm(true);
      setTimeout(() => {
        setShowConfirm(false)
        redirect("/PanelAdmin/Users")
      }, 3000)

      if (!response.ok) {
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
  };
  //#endregion 

  return (
    <>
      {fieldErrors}
      <Form error={generalError} isEditMode={false} isLoading={isLoading} onSubmit={onSave} />
      <Notification
        show={showConfirm}
        title="Register user successfully."
        explanations="This user can now login."
      />
    </>
  );
}
export default AddUser;
