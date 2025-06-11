import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../Shared/Form";
import apiRoutes from "../../../../../Constants/apiRoutes";

interface IUser {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string
  password: string;
  confirmPassword: string
  role: string
}

interface IAPIResponse {
  status: string;
  data: IUser;
}

function EditUser() {
  const { id } = useParams();
  const redirect = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();

  //#region GetUser
  useEffect(() => {
    getUser();
  }, [id]);
  const getUser = async () => {
    try {
      const response = await fetch(apiRoutes.getUserById(id))
      const data: IAPIResponse = await response.json();
      setUser(data.data)
    } catch (error: any) {
      setError(error);
    }
  };
  //#endregion 
  //#region OnSubmit
  const onSave = async (values: any) => {
    setIsLoading(true)
    try {
      const response = await fetch(apiRoutes.updateUser(id), {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        redirect("/PanelAdmin/Users");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  //#endregion  

  return (
    <>
      <Form error={error} isEditMode={true} isLoading={isLoading} onSubmit={onSave} initialValues={user} />
    </>
  );
}
export default EditUser;
