import { useEffect, useState } from "react";
import "./User.css";
import type { IUser } from "../../../../Types/Interfaces";
import Button from "../../../Elements/Buttons";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Alert from "../../../Elements/Alert";
import Select, { components } from "react-select";
import TablesSkeleton from "../../../Elements/TablesSkeleton";
import {
  ArrowPathIcon, ChevronDoubleRightIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon
} from "@heroicons/react/20/solid";

//#region Select
const CustomSelect = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  )
}
const customStyle = {
  control: (provided: any) => ({
    ...provided,
    width: "140px",
    borderRadius: "8px",
    color: "black",
    boxShadow: "none",
    textAlign: "left",
    backgroundColor: "transparent",
    border: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "black" : "grey",
    fontWeight: "bold",
    backgroundColor: state.isSelected ? "lightgrey" : "white",
    '&:hover': {
      backgroundColor: '#e6e6e6',
    }
  })
}
//#endregion 

interface IRole {
  _id: string;
  name: string;
}

export default function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertAll, setShowAlertAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();
  const [roles, setRoles] = useState<IRole[]>();
  useEffect(() => {
    setTimeout(() => {
      getUsers();
    }, 2000);
    GetRoles();
  }, []);

  //#region GetRoles
  const GetRoles = async () => {
    try {
      await axios.get(api.getRoles).then((response) => {
        setRoles(response.data);
      })
    } catch (error) {
      console.log(error);

    }
  }
  const roleOptions = roles?.map(role => ({
    value: role._id,
    label: role.name
  }))

  //#endregion 
  //#region GetUsers
  const getUsers = async () => {
    try {
      const res = await axios.get(api.getUsers);
      const data = res.data;
      setUsers(data);
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
  //#endregion
  //#region GetUsersByRole
  const getUsersByRole = async (pickedOptId?: any) => {
    const role = pickedOptId || null;
    try {
      await axios.get(`http://localhost:3000/usersById?role=${role}`).then((res) => {
        setUsers(res.data);
      })
    } catch (error) {
      console.log(error);
    }
  }
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

  if (loading) return <TablesSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {location.pathname === "/PanelAdmin/Users" ? (
        <div>
          <div className="table-nav">
            <div>
              <Link to={"AddUser"}>
                <Button text="New User" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
              </Link>
              <Button
                text="Refresh Users Table"
                icon={<ArrowPathIcon className="w-5" />}
                className="bg-sky-500"
                onClick={getUsers}
              />
              <Button
                text="DeleteAll"
                icon={<TrashIcon className="w-5" />}
                className="bg-red-700"
                onClick={handleDeleteAll}
              />
            </div>

            <Select
              styles={customStyle}
              options={roleOptions}
              components={{ Option: CustomSelect }}
              onChange={(opt) => getUsersByRole(opt?.value)}
              placeholder="All Users"
              noOptionsMessage={() => "No Users Found!"}
              isSearchable={false}
            />
          </div>
          <div className="boxTable">
            <div className="overflow-auto" style={{ maxHeight: "560px" }}>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th scope="col">UserName</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Command</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {users.length ? (
                    users.map((user) => (
                      <tr key={user._id} className="dark:hover:bg-gray-900 hover:bg-gray-200">
                        <td>
                          <p>{user.userName}</p>
                        </td>
                        <td>
                          <p>{user.role}</p>
                        </td>
                        <td>
                          <p className="text-green-500">Active</p>
                        </td>
                        <td className="btn-Sec-InForm">
                          <Button
                            onClick={() => handleDelete(user._id)}
                            text="Delete"
                            icon={<TrashIcon className="w-5" />}
                            className="bg-red-500"
                          />
                          <Link to={`EditUser/${user._id}`}>
                            <Button text="Edit Info" icon={<PencilSquareIcon className="w-5" />} className={"bg-blue-500"} />
                          </Link>
                          <Link to={`MoreInfoUser/${user._id}`}>
                            <Button text="More Info" icon={<ChevronDoubleRightIcon className="w-5" />} className={"bg-yellow-500"} />
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
          </div>
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

