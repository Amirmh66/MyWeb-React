import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Form from "../Shared/Form";

interface IType {
  name: string;
  description: string;
  imageUrl: string;
  category?: ICategory;
  slug?: string;
  createAt?: Date;
  updatedAt?: Date;
}

interface ICategory {
  _id: string;
  name: string
}

interface IAPI {
  status: string;
  data: IType
}

function EditType() {
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<IType>();

  //#region GetTypeById
  useEffect(() => {
    getTypeById();
  }, []);
  const getTypeById = async () => {
    try {
      const response = await fetch(apiRoutes.getTypeById(id))
      const data: IAPI = await response.json();
      setType(data.data)
    } catch (error: any) {
      setError(error);
    } finally {
      setError(null);
    }
  };
  //#endregion
  //#region OnSubmit
  const onSave = async (values: IType) => {
    setIsLoading(true)
    try {
      const response = await fetch(apiRoutes.updateType(id), {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        navigate("/PanelAdmin/Types");
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
      <Form error={error} isEditMode={true} isLoading={isLoading} onSubmit={onSave} initialValues={type} />
    </>
  );
}

export default EditType