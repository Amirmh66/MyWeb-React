import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Form from "../Shared/Form";

interface ICategory {
  name: string;
  description: string;
}

function AddCategory() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //#region createCategory
  const sendCategoryToServer = async (data: ICategory) => {
    setIsLoading(true)
    setError(null)
    try {
      await fetch(apiRoutes.createCategory, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        if (!res.ok){
          setError("Error Unexpected!")
        }
        navigate('/PanelAdmin/Categories')
      })

    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }
  //#endregion

  return (
    <>
      <Form error={error} isEditMode={false} isLoading={isLoading} onSubmit={sendCategoryToServer} />
    </>
  );
}
export default AddCategory;
