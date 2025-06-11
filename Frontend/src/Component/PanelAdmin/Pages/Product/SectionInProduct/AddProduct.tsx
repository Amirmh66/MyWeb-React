import api from "../../../../../Constants/apiRoutes";
import { useState } from "react";
import Notification from "../../../../Elements/Notification";
import Form from "../Shared/Form";
import { useLocation } from "react-router";

interface IProduct {
  name: string;
  price: number;
  stock: number;
  description: string
  imageUrl: string;
}

function AddProduct() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const sendProductToServer = async (values: IProduct) => {
    setIsLoading(true)
    try {
      const response = await fetch(api.createProduct, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (response.status === 200) {
        setError(null);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
      }
    } catch (error: any) {
      if (error.message === "Network Error") {
        setError("Server can't Response!")
      }
      else {
        setError(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form error={error} isLoading={isLoading} isEditMode={false} onSubmit={sendProductToServer} />

      <Notification
        show={showSuccess}
        title="Product added successfully."
        explanations="Now everyone can see the product"
      />
    </>
  );
}
export default AddProduct;
