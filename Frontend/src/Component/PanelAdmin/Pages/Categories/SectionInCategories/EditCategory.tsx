import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Categoryies.css";
import LoadingText from "../../../../Elements/LoadingText";
import From from "../Shared/Form";
import apiRoutes from "../../../../../Constants/apiRoutes";

interface ICategories {
  _id: string;
  name: string;
  description: string;
  types?: string[];
}

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<ICategories | null>(null);

  //#region GetCategory
  useEffect(() => {
    getCategory();
  }, [id]);
  const getCategory = async () => {
    try {
      const response = await fetch(apiRoutes.getCategoryById(id));
      const data = await response.json();
      setCategory(data)
    } catch (error: any) {
      setError(error);
    } finally {
      setError(null);
    }
  };
  //#endregion
  //#region UpdateCategory
  const onSave = async (values: any) => {
    setIsLoading(true)
    try {
      await fetch(apiRoutes.updateCategory(id), {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(() => {
        navigate("/PanelAdmin/Categories");
      })
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false)
    }
  };
  //#endregion

  if (isLoading) return <LoadingText />
  return (
    <>
      <From initialValues={category} error={error} isEditMode={true} onSubmit={onSave} isLoading={isLoading} />
    </>
  );
}
export default EditCategory;
