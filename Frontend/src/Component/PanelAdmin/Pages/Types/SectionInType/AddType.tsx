import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from '../Shared/Form';
import apiRoutes from '../../../../../Constants/apiRoutes';


interface IType {
  name: string;
  description: string;
  imageUrl: string;
  category?: ICategory;
}

interface ICategory {
  _id: string;
  name: string
}

function AddType() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  //#region Send Data To Server
  const onSave = async (values: IType) => {
    setIsLoading(true)
    try {
      const response = await fetch(apiRoutes.createType, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (response.ok) {
        return navigate("/PanelAdmin/Types")
      } else if (response.status === 409) {
        setError("This Type with this name exist!")
      }
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }
  //#endregion 

  return (
    <>
      <Form error={error} isEditMode={false} isLoading={isLoading} onSubmit={onSave} />
    </>
  )
}
export default AddType