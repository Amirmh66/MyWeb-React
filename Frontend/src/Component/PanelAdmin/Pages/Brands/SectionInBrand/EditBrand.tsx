import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiRoutes from "../../../../../Constants/apiRoutes";
import Form from '../Shared/From';
import { IBrand } from "../../../../../Types/Interfaces";

function EditBrand() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  const [brand, setBrand] = useState();
  const { id } = useParams();

  useEffect(() => {
    GetBrand();
  }, [])
  const GetBrand = async () => {
    try {
      const response = await fetch(apiRoutes.getBrandById(id));
      const data = await response.json();
      setBrand(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  const sendBrandToServer = async (data: IBrand) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(apiRoutes.updateBrand(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        navigate("/PanelAdmin/Brands")
      } else if (!response.ok) {
        setError("Error")
      }
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form isEditMode={true} error={error} isLoading={isLoading} initialValues={brand} onSubmit={sendBrandToServer} />
    </>
  );
}
export default EditBrand;
