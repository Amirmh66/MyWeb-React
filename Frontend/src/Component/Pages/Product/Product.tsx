import { Button } from "../../Elements/Buttons";
import "./Product.css";
import { ChebronDown, Search } from "../../Elements/Icons";
import Alert from "../../Elements/Alert.tsx";
import type { IProduct } from "../../../Types/Interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../../Constants/apiRoutes.ts";

export default function Product() {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);
  //GetProduct
  const fetchProduct = async () => {
    try {
      const response = await fetch(api.getProducts);
      if (!response.ok) {
        throw new Error("Network Response was not Ok");
      }
      const data = await response.json();
      setProduct(data);
    } catch ({ error }: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //#region DeleteProduct
  const handleDelete = (productId: string) => {
    setSelectedId(productId);
    setShowAlert(true);
  };

  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(api.deleteProduct(selectedId));
        setShowAlert(false);
        setSelectedId(null);
        fetchProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const CancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };
  //#endregion

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-md p-2 drop-shadow">
        <div className="head-table">
          <thead>
            <tr>
              <th>
                <p>Search for Product</p>
              </th>
              {/* All Category */}
              <th>
                <button className="flex items-center th-h">
                  All Category
                  <ChebronDown />
                </button>
              </th>
              {/* All Product */}
              <th>
                <button className="flex items-center th-h">
                  All Product
                  <ChebronDown />
                </button>
              </th>
              {/* Srearch */}
              <th>
                <button className="flex items-center th-h">
                  <Search />
                </button>
              </th>
              {/* Button-Add */}
              <th>
                <Link to={"/AddProduct"}>
                  <Button text="New Product" color="bg-green-500" />
                </Link>
              </th>
            </tr>
          </thead>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="th">
                <input type="checkbox" />
              </th>

              <th className="th">
                <p>Image</p>
              </th>

              <th className="th">
                <p>Name</p>
              </th>

              <th className="th">
                <p>Status</p>
              </th>

              <th className="th">
                <p>Stock</p>
              </th>
              <th className="th">
                <p>Price</p>
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="tr">
                <td className="td">
                  <input type="checkbox" />
                </td>

                <td className="td">
                  <img className="w-12 h-12 rounded" src={p.Picture} />
                </td>

                <td className="td">
                  <p>{p.Name}</p>
                </td>

                <td className="td">
                  {p.Stock >= 6 ? (
                    <p className="text-green-500">Avaliable</p>
                  ) : (
                    <p className="text-red-600">Only 5 left</p>
                  )}
                </td>

                <td className="td">
                  <p>{p.Stock}</p>
                </td>

                <td className="td">
                  <p>${p.Price}</p>
                </td>

                <td className="td">
                  <Button
                    onClick={() => handleDelete(p._id)}
                    text="Delete"
                    color="bg-red-500"
                  />

                  <Link to={`/EditProduct/${p._id}`}>
                    <Button text="Edit" color="bg-yellow-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This Product?"
          onCancle={CancelDelete}
          onConfirm={ConfirmDelete}
        />
      )}
    </>
  );
}
