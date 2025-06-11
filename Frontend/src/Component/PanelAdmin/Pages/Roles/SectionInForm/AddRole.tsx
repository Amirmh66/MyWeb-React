import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Form from "../Shared/Form";


function AddRole() {
  const [error, setError] = useState<string | null>(null);
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSave = async (values: any) => {
    setIsLoading(true)
    try {
      const res = await fetch(apiRoutes.createRole, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (res.ok) {
        redirect("/PanelAdmin/Roles");
      }
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form error={error} isEditMode={false} isLoading={isLoading} onSubmit={onSave} />
    </>
  );
}
export default AddRole;
