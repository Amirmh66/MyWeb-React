import { useEffect, useState } from "react";
import type { ICategories } from "../../../../Types/Interfaces";
import Button from "../../../Elements/Buttons";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Alert from "../../../Elements/Alert";
import "./Categoryies.css";
import { ArrowPathIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import TablesSkeleton from "../../../Elements/TablesSkeleton";

function Categories() {

  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertAll, setShowAlertAll] = useState(false);
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
    setSelectedId(productId);
    setShowAlert(true);
  };

  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(api.deleteCategory(selectedId));
        setShowAlert(false);
        setSelectedId(null);
        getCategories();
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
  //#region DeleteCategories
  const handleDeleteAll = () => {
    setShowAlertAll(true);
  };

  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllCategories);
      setShowAlertAll(false);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };
  const CancelDeleteAll = () => {
    setShowAlertAll(false);
  };
  //#endregion

  if (loading) return <TablesSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {location.pathname === "/PanelAdmin/Categories" ? (
        <div>
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
              onClick={handleDeleteAll}
            />
          </div>
          <div className="boxTable">
            <div className="overflow-auto" style={{ maxHeight: "490px" }}>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Command</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {categories.map((c) => (
                    <tr
                      key={c._id}
                      className="hover:bg-gray-300 dark:hover:bg-gray-900"
                    >
                      <td>{c.name}</td>
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
          </div>
        </div>
      ) : (
        <Outlet />
      )}
      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This Categories?"
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
export default Categories;
