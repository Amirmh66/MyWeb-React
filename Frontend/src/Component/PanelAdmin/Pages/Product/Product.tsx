import Button from "../../../Elements/Buttons";
import "./Product.css";
import { ChebronDown, Search } from "../../../Elements/Icons";
import Alert from "../../../Elements/Alert.tsx";
import type { IProduct } from "../../../../Types/Interfaces";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes.ts";
import Loading from "../../../Elements/Loading.tsx";

export default function Product() {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertAll, setShowAlertAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();
  useEffect(() => {
    fetchProduct();
  }, []);

  //#region getProduct
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
  //#endregion
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
  //#region DeleteAll
  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllProducts);
      setShowAlertAll(false);
      fetchProduct();
    } catch ({ error }: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const CancelDeleteAll = () => {
    setShowAlertAll(false);
  };

  const handleDeleteAll = async () => {
    setShowAlertAll(true);
  };
  //#endregion

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {location.pathname === "/PanelAdmin/Product" ? (
        <div className="theme rounded-md p-2 drop-shadow overflow-x-hidden max-h-screen">
          <div className="head-table">
            <Link to={"AddProduct"}>
              <Button text="New Product" className="bg-green-500" />
            </Link>
            <Button
              text="Refresh Product Table"
              className="bg-sky-500"
              onClick={fetchProduct}
            />
            <Button
              text="DeleteAll"
              className="bg-red-700"
              onClick={handleDeleteAll}
            />
            <button className="filterbtn">
              All Category
              <ChebronDown />
            </button>
            <button className="filterbtn">
              All Product
              <ChebronDown />
            </button>
            <button className="filterbtn">
              <Search />
            </button>
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
                <th>
                  <p>Category</p>
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
                    <img
                      className="w-12 h-12 rounded text-xs"
                      src={p.imageUrl}
                      alt={p.name}
                    />
                  </td>

                  <td className="td">
                    <p>{p.name}</p>
                  </td>

                  <td className="td">
                    {p.stock > 9 ? (
                      <p className="text-green-500">Avaliable</p>
                    ) : (
                      <p className="text-red-600">{`Only ${p.stock} left`}</p>
                    )}
                  </td>

                  <td className="td">
                    <p>{p.stock}</p>
                  </td>

                  <td className="td">
                    <p>${p.price}</p>
                  </td>

                  <td className="td">
                    <p>{p.category}</p>
                  </td>
                  <td className="td">
                    <Button
                      onClick={() => handleDelete(p._id)}
                      text="Delete"
                      className="bg-red-500"
                    />

                    <Link to={`EditProduct/${p._id}`}>
                      <Button text="Edit" className="bg-yellow-500" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Outlet />
      )}

      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This Product?"
          onCancle={CancelDelete}
          onConfirm={ConfirmDelete}
        />
      )}
      {showAlertAll && (
        <Alert
          message="Warning: This action will delete all data, but do you want to do it?"
          onCancle={CancelDeleteAll}
          onConfirm={ConfirmDeleteAll}
        />
      )}
    </>
  );
}
