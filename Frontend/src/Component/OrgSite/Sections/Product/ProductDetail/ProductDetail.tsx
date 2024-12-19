import axios from "axios";
import { useParams } from "react-router-dom";
import api from "../../../../../Constants/apiRoutes";
import { useEffect, useState } from "react";
import LoadingText from "../../../../Elements/LoadingText";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import Button from "../../../../Elements/Buttons";
import { addToCart } from "../../../../Features/SoppingCart/CartSlice/Cart-Slice";
import { useCartDispatch } from "../../../../Features/hooks";

function ProductDetail() {
  const dispatch = useCartDispatch();
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    imageUrl: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    category: "",
  });
  function handleAddToCart() {
    dispatch(addToCart({ id: id, name: product.name, price: product.price }));
  }

  //#region GetProduct
  useEffect(() => {
    if (loading) {
      getProduct();
    }
  });
  const getProduct = async () => {
    try {
      await axios.get(api.getProductById(id)).then((res) => {
        setProduct(res.data);
      });
    } catch (error: any) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  //#endregion 

  if (loading) return <LoadingText />;

  return (
    <>
      <div className="mx-0 md:mx-32 my-6 p-5">
        {error && <p className="error">{error}</p>}
        <div className="border border-gray-500 rounded-lg p-5 flex flex-col justify-center ">
          <div className="bg-neutral-300 dark:bg-gray-800 text-black dark:text-white p-2  inline-block rounded-lg">
            <p className="text-lg font-medium">
              Category :{" "}
              <span className="text-sm font-bold">{product.category}</span>
            </p>
          </div>

          <div className="flex flex-col justify-center pt-5">
            <img
              className="w-full h-60 bg-violet-500 rounded-lg "
            />

            <div className="mt-3 flex justify-between">
              <div>
                <p className="text-xl font-medium">{product.name}</p>
              </div>
              <div className="bg-gray-200 dark:bg-gray-950 p-2 rounded-lg text-lg font-medium">
                <p>${product.price}</p>
              </div>
            </div>
            <div className="font-normal text-left pt-16 px-10 ">
              <div className="border-t-2 border-gray-200"></div>
              <p className="py-10">{product.description}</p>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={handleAddToCart}
              className="bg-sky-400"
              text="Add To Shopping Cart"
            />
          </div>
        </div>

        <RelatedProduct />
      </div>
    </>
  );
}

export default ProductDetail;
