import Button from "../../../Elements/Buttons";
import "./Product.css";
import { ArrowPathIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid"
import type { IProduct } from "../../../../Types/Interfaces";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes.ts";
import TablesSkeleton from "../../../Elements/TablesSkeleton.tsx";
import Modal from "../../../Elements/Modal.tsx";
export default function Product() {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalAll, setShowModalAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [limit] = useState(9);
  const location = useLocation();

  useEffect(() => {
    getProduct()
  }, [products]);
  //#region getProduct
  const getProduct = async () => {
    try {
      const response = await axios.get(api.getProducts(limit));
      setProduct(response.data);
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
    setShowModal(true);
  };
  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(api.deleteProduct(selectedId));
        setShowModal(false);
        setSelectedId(null);
        getProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };
  //#endregion
  //#region DeleteAll
  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllProducts);
      setShowModalAll(false);
      getProduct();
    } catch ({ error }: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  //#endregion

  if (loading) return <TablesSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {location.pathname === "/PanelAdmin/Product" ? (
        <>
          <div className="table-nav">
            <div>
              <Link to={"AddProduct"}>
                <Button text="New Product" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
              </Link>
              <Button
                text="Refresh Product Table"
                icon={<ArrowPathIcon className="w-5" />}
                className="bg-sky-500"
                onClick={() => getProduct()}
              />
              <Button
                text="DeleteAll"
                icon={<TrashIcon className="w-5" />}
                className="bg-red-700"
                onClick={() => setShowModalAll(true)}
              />
            </div>
          </div>
          <div>
            <div className="overflow-auto" style={{ maxHeight: "479px" }}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Command</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length < 0 ? "Noting" : (products.map((p) => (
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
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
      <Modal title="Are you sure you want to delete this product?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600 hover:bg-red-700" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
      <Modal title="Warning: this action will erase all data.Are you sure you want to proceed?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModalAll} onClose={() => setShowModalAll}>
        <Button className="bg-red-600 hover:bg-red-700" text="Delete" onClick={ConfirmDeleteAll} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModalAll(false)} />
      </Modal>
    </>
  );
}