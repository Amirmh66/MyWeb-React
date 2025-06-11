import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Form from "../Shared/Form";

interface IAPIResponse {
  status: string;
  data: IRole
}

interface IRole {
  name: string;
}

function EditRole() {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const redirect = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<IRole>();

  //#region GetRole
  useEffect(() => {
    getRole();
  }, [id]);
  const getRole = async () => {
    try {
      const response = await fetch(apiRoutes.getRoleById(id));
      const data: IAPIResponse = await response.json();
      setRole(data.data)
    } catch (error: any) {
      setError(error);
    }
  };
  //#endregion 

  //#region OnSubmit
  const onSave = async (values: any) => {
    setIsLoading(true)
    try {
      await fetch(apiRoutes.updateRole(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(values)
      }).then((res) => {
        if (res.ok) {
          redirect("/PanelAdmin/Roles");
        }
      })
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false)
    }
  };
  //#endregion 

  return (
    <>
      <Form error={error} isEditMode={true} isLoading={isLoading} onSubmit={onSave} initialValues={role} />
    </>
  );
}
export default EditRole;
