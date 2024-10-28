import { useEffect, useState } from "react";
import { IProduct } from "../../../../Types/Interfaces";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import "./Products.css";
import Loading from "../../../Elements/Loading";
import Card from "./CardProduct/Card";
function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GetProduct();
  }, []);

  const GetProduct = async () => {
    try {
      const response = await axios(api.getProducts);
      const data = response.data;
      setProducts(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="productSec">
        {products.map((product) => (
          <Card
            _id={product._id}
            imageUrl={product.imageUrl}
            name={product.name}
            summary={product.summary}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
}

export default Products;
