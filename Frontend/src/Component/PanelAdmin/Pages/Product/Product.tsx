import Button from "../../../Elements/Buttons";
import "./Product.css";
import { ArrowPathIcon, ChevronDownIcon, CurrencyDollarIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid"
import Alert from "../../../Elements/Alert.tsx";
import type { IProduct } from "../../../../Types/Interfaces";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes.ts";
import TablesSkeleton from "../../../Elements/TablesSkeleton.tsx";
import Pagination from "../../../Elements/Paganation.tsx";

export default function Product() {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertAll, setShowAlertAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(9);
  const location = useLocation();

  useEffect(() => {
    getProduct(currentPage);
  }, [currentPage]);

  //#region getProduct
  const getProduct = async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/products?page=${page}&limit=${limit}`);
      setProduct(response.data.products)
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      if (error.message === 'Network Error') {
        setError("Server Can't Response")
      }
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
        getProduct(currentPage);
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
      getProduct(currentPage);
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

  if (loading) return <TablesSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {location.pathname === "/PanelAdmin/Product" ? (
        <div>
          <div className="table-nav">
            <div>
              <Link to={"AddProduct"}>
                <Button text="New Product" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
              </Link>
              <Button
                text="Refresh Product Table"
                icon={<ArrowPathIcon className="w-5" />}
                className="bg-sky-500"
                onClick={() => getProduct(currentPage)}
              />
              <Button
                text="DeleteAll"
                icon={<TrashIcon className="w-5" />}
                className="bg-red-700"
                onClick={handleDeleteAll}
              />
            </div>
            <button className="filterbtn">
              All Category
              <ChevronDownIcon className="w-5" />
            </button>
            <button className="filterbtn">
              All Product
              <ChevronDownIcon className="w-5" />
            </button>
            <button className="filterbtn">
              All Brands
              <ChevronDownIcon className="w-5" />
            </button>
            <button className="filterbtn">
              <MagnifyingGlassIcon />
            </button>
          </div>
          <div className="boxTable">
            <div className=" overflow-auto" style={{ maxHeight: "479px" }}>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Command</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {products.map((p) => (
                    <tr
                      key={p._id}
                      className="dark:hover:bg-gray-900 hover:bg-gray-200"
                    >
                      <td>
                        <img
                          className="w-14 h-12 rounded text-xs"
                          srcSet="/Images/Darwin.png"
                          alt={p.name}
                        />
                      </td>

                      <td>
                        <p>{p.name}</p>
                      </td>

                      <td>
                        {p.stock > 9 ? (
                          <p className="text-green-500">Avaliable</p>
                        ) : (
                          <p className="text-red-600">{`Only ${p.stock} left`}</p>
                        )}
                      </td>
                      <td>
                        <p>{p.stock}</p>
                      </td>
                      <td>
                        <p>${p.price}</p>
                      </td>
                      <td className="btn-Sec-InForm">
                        <Button
                          onClick={() => handleDelete(p._id)}
                          icon={<TrashIcon className="w-5" />}
                          text="Delete"
                          className="bg-red-500"
                        />
                        <Link to={`EditProduct/${p._id}`}>
                          <Button text="Edit" icon={<PencilSquareIcon className="w-5" />} className="bg-yellow-500" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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
