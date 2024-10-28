import { useEffect, useState } from "react";
import type { ICategories } from "../../../../Types/Interfaces";
import Button from "../../../Elements/Buttons";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Alert from "../../../Elements/Alert";
import Loading from "../../../Elements/Loading";

function Categories() {
  //#region States
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertAll, setShowAlertAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();
  //#endregion

  useEffect(() => {
    getCategories();
  }, []);

  //#region GetAllCategories
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

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {location.pathname === "/PanelAdmin/Categories" ? (
        <div className="theme rounded-md p-2 drop-shadow">
          <div className="head-table">
            <Link to="addCategory">
              <Button text="Create Category" className="bg-green-500" />
            </Link>
            <Button
              text="Refresh Users Table"
              className="bg-blue-500"
              onClick={getCategories}
            />
            <Button
              text="DeleteAllCategories"
              className="bg-red-800"
              onClick={handleDeleteAll}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="th">
                  <p>Name</p>
                </th>
                <th className="th">
                  <p>Description</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="td">
                    <h5>{category.name}</h5>
                  </td>
                  <td className="td">
                  <h5>{category.description}</h5>
                  </td>
                  <td className="td">
                    <Button
                      onClick={() => handleDelete(category._id)}
                      text="Delete"
                      className="bg-red-500"
                    />
                    <Link to={`EditCategory/${category._id}`}>
                      <Button text="Edit Info" className={"bg-blue-500"} />
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
