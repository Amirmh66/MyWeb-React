import { useEffect, useState } from "react"
import type { ICategories } from "../../../../Types/Interfaces"
import Button from "../../../Elements/Buttons"
import { Link, Outlet, useLocation } from "react-router-dom"
import axios from "axios"
import api from "../../../../Constants/apiRoutes"
import "./Categoryies.css";
import { ArrowPathIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid"
import TablesSkeleton from "../../../Elements/TablesSkeleton"
import Modal from "../../../Elements/Modal"
function Categories() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalAll, setShowModalAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();
  //#region GetAllCategories
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const response = await fetch(api.getCategories);
      if (!response.ok) {
        throw new Error("Network Response was not Ok");
      }
      const data = await response.json();
      setCategories(data);
    } catch ({ error }: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  //#endregion
  //#region DeleteCategory
  const handleDelete = (productId: string) => {
    setShowModal(true);
    setSelectedId(productId);
  };
  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(api.deleteCategory(selectedId));
        setShowModal(false);
        setSelectedId(null);
        getCategories();
      } catch (error) {
        console.log(error);
      }
    }
  };
  //#endregion
  //#region DeleteCategories
  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllCategories);
      setShowModalAll(false);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion
  if (loading) return <TablesSkeleton />
  if (error) return <p>Error: {error}</p>
  return (
    <>
      {location.pathname === "/PanelAdmin/Categories" ? (
        <>
          <div className="table-nav">
            <Link to="addCategory">
              <Button text="Create Category" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
            </Link>
            <Button
              text="Refresh Categories Table"
              className="bg-blue-500"
              icon={<ArrowPathIcon className="w-5" />}
              onClick={getCategories}
            />
            <Button
              text="DeleteAllCategories"
              icon={<TrashIcon className="w-5" />}
              className="bg-red-800 "
              onClick={() => setShowModalAll(true)}
            />
          </div>
          <div className="overflow-auto" style={{ maxHeight: "490px" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col">Command</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <p>{c.name}</p>
                    </td>
                    <td className="btn-Sec-InForm">
                      <Button
                        onClick={() => handleDelete(c._id)}
                        text="Delete"
                        icon={<TrashIcon className="w-5" />}
                        className="bg-red-600"
                      />
                      <Link to={`EditCategory/${c._id}`}>
                        <Button text="Edit" icon={<PencilSquareIcon className="w-5" />} className="bg-blue-600" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Outlet />
      )}
      <Modal title="Are You Sure You Want to Delete This Categories?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
      <Modal title="Warning: This action will delete all data, but do you want to do it?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModalAll} onClose={() => setShowModalAll}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDeleteAll} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModalAll(false)} />
      </Modal>
    </>
  )
}
export default Categories