import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../../../../../Constants/apiRoutes";
import { useEffect, useState } from "react";
import Loading from "../../../../Elements/Loading";
import RelatedProduct from "../RelatedProduct/RelatedProduct";

function ProductDetail() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    imageUrl: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    summary: "",
    category: "",
  });
  useEffect(() => {
    getProduct();
  });
  const getProduct = async () => {
    try {
      const response = await axios.get(api.getProductById(id));
      const data = response.data;
      setProduct(data);
    } catch ({ error }: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="mx-32 my-10 p-5 ">
        <div className="border border-gray-500 rounded-lg p-5 flex flex-col justify-center ">
          <div className="bg-neutral-300 dark:bg-gray-800 text-black dark:text-white p-2  inline-block rounded-lg">
            <p className="text-lg font-medium">
              Category :{" "}
              <span className="text-sm font-bold">{product.category}</span>
            </p>
          </div>

          <div className="flex flex-col justify-center pt-5">
            <img
              src=""
              alt=""
              className="w-full h-60 bg-violet-500 rounded-lg "
            />

            <div className="mt-3 flex justify-between">
              <div>
                <p className="text-xl font-medium">{product.name}</p>
                <p>{product.summary}</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg text-lg font-medium">
                <p>${product.price}</p>
              </div>
            </div>
            <div className="font-normal text-left pt-16 px-10 ">
              <div className="border-t-2 border-gray-200"></div>
              <p className="py-10">{product.description}</p>
            </div>
          </div>
        </div>

        <RelatedProduct />
      </div>
    </>
  );
}

export default ProductDetail;
