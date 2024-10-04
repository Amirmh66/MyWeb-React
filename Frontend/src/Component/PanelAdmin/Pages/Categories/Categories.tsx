import { useEffect, useState } from "react";
import type { ICategories } from "../../../../Types/Interfaces";
import { Button } from "../../../Elements/Buttons";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Alert from "../../../Elements/Alert";
export default function Categories() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
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
  //#region DeleteCategories
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Outlet />
      <div className="bg-white dark:bg-gray-800 rounded-md p-2 drop-shadow">
        <div className="head-table">
          <Link to="addCategory">
            <Button text="Create Category" color="bg-green-500" />
          </Link>
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
                {/* Name */}
                <td className="td">
                  <h5>{category.Name}</h5>
                </td>
                {/* Email */}
                <td className="td">
                    {category.Description.length > 0 ? (   <h5>{category.Description}</h5>) : "None"}
               
                </td>

                {/* Buttuns */}
                <td className="td">
                  <Button
                    onClick={() => handleDelete(category._id)}
                    text="Delete"
                    color="bg-red-500"
                  />
                  <Link to={`EditCategory/${category._id}`}>
                    <Button text="Edit Info" color={"bg-blue-500"} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This Categories?"
          onCancle={CancelDelete}
          onConfirm={ConfirmDelete}
        />
      )}
    </>
  );
}
