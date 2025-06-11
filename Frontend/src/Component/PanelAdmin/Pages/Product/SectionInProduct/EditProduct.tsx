import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../../Constants/apiRoutes";
import LoadingText from "../../../../Elements/LoadingText";
import Notification from "../../../../Elements/Notification";
import Form from "../Shared/Form";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string
  imageUrl: string;
}

interface IAPIResponse {
  status: string;
  data: IProduct
}

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>();

  //#region GetProduct
  useEffect(() => {
    getProduct();
  }, [id]);
  const getProduct = async () => {
    try {
      const response = await fetch(api.getProductById(id));
      const data: IAPIResponse = await response.json();
      setProduct(data.data)
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  //#endregion
  //#region UpdateProduct
  const updateProduct = async (values: any) => {
    setIsLoading(true)
    try {
      await fetch(api.updateProduct(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then((res) => {
        if (res.status === 200) {
          navigate("/PanelAdmin/Product");
        }
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  //#endregion 

  if (isLoading) return <LoadingText />
  return (
    <>
      <Form error={error} isEditMode={true} isLoading={isLoading} onSubmit={updateProduct} initialValues={product} />
    </>
  );
}

export default EditProduct;
