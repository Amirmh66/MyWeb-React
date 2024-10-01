import { useEffect, useState } from "react";
import "./User.css";
import "../../GlobalStyle/Glogbal.css";
import type { IUser } from "../../../Types/Interfaces";
import { Button } from "../../Elements/Buttons";
import { ChebronDown, Search } from "../../Elements/Icons";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../../Constants/apiRoutes";
import Alert from "../../Elements/Alert";
export default function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
      <div className="bg-white dark:bg-gray-800 rounded-md p-2 drop-shadow">
        <div className="head-table">
          <thead>
            <tr>
              <th>
                <Link to={"/AddUser"}>
                  <Button text="Create User" color="bg-green-500" />
                </Link>
              </th>
              <th>
                <button className="flex items-center th-h">
                  All Users
                  <ChebronDown />
                </button>
              </th>
              <th>
                <button className="flex items-center th-h">
                  <Search />
                </button>
              </th>
            </tr>
          </thead>
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
                <p>PhoneNumber</p>
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
                  <h5 className="line-clamp-1">{user.UserName}</h5>
                </td>
                {/* Email */}
                <td className="td">
                  <h5>{user.Email}</h5>
                </td>
                {/* PhoneNumber */}
                <td className="td">
                  <h5>{user.PhoneNumber}</h5>
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
                  <Link to={`/EditUser/${user._id}`}>
                    <Button text="Edit Info" color={"bg-blue-500"} />
                  </Link>
                  <Link to={`/MoreInfoUser/${user._id}`}>
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
