import { useEffect, useState } from "react";
import { IProduct } from "../../../../Types/Interfaces";
import axios from "axios";
import "./Products.css";
import Card from "./CardProduct/Card";
import Paganation from '../../../Elements/Paganation'
import ProductsLoadingSkeleton from "../../../Elements/ProductsLoadingSkeleton";

function Products() {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  //#region GetProduct
  useEffect(() => {
    setTimeout(() => {
      GetProduct(currentPage);
    }, 1000);
  }, [currentPage]);
  const GetProduct = async (page: number) => {
    try {
      await axios.get(`http://localhost:3000/products?page=${page}&limit=${limit}`).then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      });
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  //#endregion

 
  if (loading) return <ProductsLoadingSkeleton />;
  if (error) return <div className="bg-white text-red-600 font-semibold text-lg p-2 inline-block m-10 rounded-lg ">
    Error: {error}
  </div>

  return (
    <>
      <div className="productSec">
        {products.map((product) => (
          <li key={product._id} className="list-none">
            <Card
              _id={product._id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
            />
          </li>
        ))}
      </div>
      <Paganation currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
}

export default Products;
