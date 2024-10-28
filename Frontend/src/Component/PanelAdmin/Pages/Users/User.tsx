import { useEffect, useState } from "react";
import "./User.css";
import type { IUser } from "../../../../Types/Interfaces";
import Button from "../../../Elements/Buttons";
import { ChebronDown, Search } from "../../../Elements/Icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Alert from "../../../Elements/Alert";
import Loading from "../../../Elements/Loading";
export default function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertAll, setShowAlertAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    getUsers();
  }, []);

  //#region GetAllUser
  const getUsers = async () => {
    try {
      const res = await axios.get(api.getUsers);
      const data = res.data;
      setUsers(data);
    } catch (error: any) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  //#endregion
  //#region DeleteUser
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
  //#region DeleteAllUsers

  const handleDeleteAll = () => {
    setShowAlertAll(true);
  };
  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllUsers);
      setShowAlertAll(false);
      getUsers();
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
      {location.pathname === "/PanelAdmin/Users" ? (
        <div className="theme rounded-md p-2 drop-shadow">
          <div className="head-table">
            <Link to="AddUser">
              <Button text="Create User" className="bg-green-500" />
            </Link>
            <Button
              text="Refresh Users Table"
              className="bg-blue-500"
              onClick={getUsers}
            />
            <Button
              text="DeleteAllUsers"
              className="bg-red-700"
              onClick={handleDeleteAll}
            />
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
              {users.length ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="td">
                      <h5>{user.userName}</h5>
                    </td>
                    <td className="td">
                      <h5>{user.role}</h5>
                    </td>
                    <td className="td">
                      <p className="text-green-500">Active</p>
                    </td>
                    <td className="td">
                      <Button
                        onClick={() => handleDelete(user._id)}
                        text="Delete"
                        className="bg-red-500"
                      />
                      <Link to={`EditUser/${user._id}`}>
                        <Button text="Edit Info" className={"bg-blue-500"} />
                      </Link>
                      <Link to={`MoreInfoUser/${user._id}`}>
                        <Button text="More Info" className={"bg-yellow-500"} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="m-10">
                  <p className="text-lg font-semibold">No Users To Display</p>
                </div>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <Outlet />
      )}

      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This User?"
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
