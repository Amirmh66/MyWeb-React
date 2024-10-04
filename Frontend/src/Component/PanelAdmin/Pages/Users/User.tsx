import { useEffect, useState } from "react";
import "./User.css";
import type { IUser } from "../../../../Types/Interfaces";
import { Button } from "../../../Elements/Buttons";
import { ChebronDown, Search } from "../../../Elements/Icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Alert from "../../../Elements/Alert";
export default function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);

  //#region GetAllUser
  const getUsers = async () => {
    try {
      const response = await fetch(api.getUsers);
      if (!response.ok) {
        throw new Error("Network Response was not Ok");
      }
      const data = await response.json();
      setUsers(data);
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
        await axios.delete(api.deleteUser(selectedId));
        setShowAlert(false);
        setSelectedId(null);
        navigate("users");
        getUsers();
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
          <Link to="AddUser">
            <Button text="Create User" color="bg-green-500" />
          </Link>
          <button className="filterbtn">
            All Users
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
                <p>UserName</p>
              </th>
              <th className="th">
                <p>Email</p>
              </th>
              <th className="th">
                <p>Role</p>
              </th>

              <th className="th">
                <p>Status</p>
              </th>

              <th className="th">
                <p>Command</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                {/* Name */}
                <td className="td">
                  <h5>{user.UserName}</h5>
                </td>
                {/* Email */}
                <td className="td">
                  <h5>{user.Email}</h5>
                </td>
                {/* Role */}
                <td className="td">
                  <h5>{user.Role}</h5>
                </td>
                {/* Status */}
                <td className="td">
                  <p className="text-green-500">Active</p>
                </td>
                {/* Buttuns */}
                <td className="td">
                  <Button
                    onClick={() => handleDelete(user._id)}
                    text="Delete"
                    color="bg-red-500"
                  />
                  <Link to={`EditUser/${user._id}`}>
                    <Button text="Edit Info" color={"bg-blue-500"} />
                  </Link>
                  <Link to={`MoreInfoUser/${user._id}`}>
                    <Button text="More Info" color={"bg-yellow-500"} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This User?"
          onCancle={CancelDelete}
          onConfirm={ConfirmDelete}
        />
      )}
    </>
  );
}
