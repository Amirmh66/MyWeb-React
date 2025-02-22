import { useEffect, useState } from "react";
import "./User.css";
import type { IUser } from "../../../../Types/Interfaces";
import Button from "../../../Elements/Buttons";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Select, { components } from "react-select";
import TablesSkeleton from "../../../Elements/TablesSkeleton";
import { IRole } from "../../../../Types/Interfaces";
import {
  ArrowPathIcon, ChevronDoubleRightIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon, EllipsisHorizontalIcon
} from "@heroicons/react/20/solid";
import Modal from "../../../Elements/Modal";

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

function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisibleBtnNav, setVisibleBtnNav] = useState<Boolean>(false);
  const [isOpenUserDetil, setIsOpenUserDetil] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalAll, setShowModalAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();
  const [roles, setRoles] = useState<IRole[]>();
  useEffect(() => {
    setTimeout(() => {
      getUsers();
    }, 2000);
    GetRoles();
  }, []);

  const toggleMenu = (userId: string) => {
    setIsOpenUserDetil(isOpenUserDetil === userId ? null : userId);
  }

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
    setShowModal(true);
    setSelectedId(productId);
  };
  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(api.deleteUser(selectedId));
        setShowModal(false);
        setSelectedId(null);
        getUsers();
      } catch (error: any) {
        setError(error)
      }
    }
  };
  //#endregion
  //#region DeleteAllUsers
  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllUsers);
      setShowModalAll(false);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  if (loading) return <TablesSkeleton />;
  if (error) return <p>Error: {error}</p>;
  // onClick={(e) => e.stopPropagation()} 
  return (
    <>
      {location.pathname === "/PanelAdmin/Users" ? (
        <>
          <div className="table-nav justify-between">
            <div className="hidden xl:block">
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
                onClick={() => setShowModalAll(true)}
              />
            </div>
            <div>
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
            <div className="relative lg:hidden">
              <EllipsisHorizontalIcon title="Show commands" className="rounded-full w-9 dark:hover:bg-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => setVisibleBtnNav(!isVisibleBtnNav)}
              />
              {isVisibleBtnNav && (
                <div className="absolute right-0 z-30 p-2 bg-gray-100 rounded-lg 
                select-none top-10 dark:bg-neutral-900 drop-shadow-xl">
                  <div className="flex flex-col gap-2">
                    <Link to={"AddUser"}>
                      <Button text="New User"
                        className="w-full bg-green-500"
                        icon={<PlusCircleIcon className="w-5" />}
                      />
                    </Link>
                    <Button
                      text="RefreshTable"
                      className="w-full bg-sky-500"
                      icon={<ArrowPathIcon className="w-5" />}
                      onClick={getUsers}
                    />
                    <Button
                      text="Delete All"
                      className="w-full bg-red-700"
                      icon={<TrashIcon className="w-5" />}
                      onClick={() => setShowModalAll(true)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {users.length ? (
            <div className="boxTable">
              <div className="overflow-auto md:overflow-auto" style={{ maxHeight: "560px" }}>
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
                    {users.map((user) => (
                      <tr key={user._id} className="dark:hover:bg-gray-900 hover:bg-gray-200">
                        <td>
                          <p>{user.userName}</p>
                        </td>
                        <td>
                          <p>{user.role ? user.role.name : "No Role"}</p>
                        </td>
                        <td>
                          <p className="text-green-500">Active</p>
                        </td>
                        <td className="btn-Sec-InForm">
                          <div className="hidden md:block">
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
                          </div>

                          <div className="block md:hidden relative">
                            <EllipsisHorizontalIcon onClick={() => toggleMenu(user._id)} className="w-9 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all 
                          duration-100 cursor-pointer rounded-full p-1" />

                            {isOpenUserDetil === user._id && (
                              <div className="absolute z-50 dark:bg-gray-800 transition-all duration-300
                               bg-gray-200 right-2 top-full p-2 rounded-lg">
                                <div className="flex flex-col gap-1">
                                  < Button
                                    onClick={() => handleDelete(user._id)}
                                    icon={<TrashIcon className="w-5" />}
                                    className="bg-red-500 w-full"
                                    text="Delete"
                                  />
                                  <Link to={`EditUser/${user._id}`}>
                                    <Button icon={<PencilSquareIcon className="w-5 " />} text="Edit" className="bg-blue-500 w-full" />
                                  </Link>
                                  <Link to={`MoreInfoUser/${user._id}`}>
                                    <Button icon={<ChevronDoubleRightIcon className="w-5 " />} text="Info" className="bg-yellow-500 w-full" />
                                  </Link>
                                </div>
                              </div>
                            )}

                          </div>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="m-10">
              <p className="text-lg font-semibold">No Users To Display</p>
            </div>
          )}
        </>
      ) : (
        <Outlet />
      )}
      <Modal title="Are You Sure You Want to Delete This User?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
      <Modal title="Warning: This action will delete all data, but do you want to do it?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModalAll} onClose={() => showModalAll}>
        <Button className="bg-red-800" text="Delete" onClick={ConfirmDeleteAll} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModalAll(false)} />
      </Modal>
    </>
  );
}

export default User;