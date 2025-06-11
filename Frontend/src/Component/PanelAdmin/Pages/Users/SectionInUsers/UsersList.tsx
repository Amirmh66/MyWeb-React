import { useEffect, useState } from "react";
import { components } from "react-select";
import { IRole, IUser } from "../../../../../Types/Interfaces";
import apiRoutes from "../../../../../Constants/apiRoutes";
import TablesSkeleton from "../../../../Elements/TablesSkeleton";
import { Link } from "react-router-dom";
import { ChevronDoubleRightIcon, EllipsisHorizontalIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import Button from "../../../../Elements/Buttons";
import Select from 'react-select'
import Modal from "../../../../Elements/Modal";

interface IAPIUser {
    status: string;
    data: IUser[];
}

interface IAPIRoles {
    status: string;
    data: IRole[];
}

function UsersList() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [roles, setRoles] = useState<IRole[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isVisibleBtnNav, setVisibleBtnNav] = useState<Boolean>(false);
    const [isOpenUserDetil, setIsOpenUserDetil] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    useEffect(() => {
        getUsers();
        GetRoles();
    }, []);

    const toggleMenu = (userId: string) => {
        setIsOpenUserDetil(isOpenUserDetil === userId ? null : userId);
    }

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
    //#region GetRoles
    const GetRoles = async () => {
        try {
            const response = await fetch(apiRoutes.getRoles);
            const data: IAPIRoles = await response.json();
            setRoles(data.data);
        } catch (error) {
            console.log(error);

        }
    }
    const roleOptions = roles?.map((role) => ({
        value: role._id,
        label: role.name
    }))

    //#endregion 
    //#region GetUsers
    const getUsers = async () => {
        try {
            const res = await fetch(apiRoutes.getUsers);
            const data: IAPIUser = await res.json();
            if (data.status === 'success') {
                setUsers(data.data);
            }
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };
    //#endregion
    //#region GetUsersByRole
    const getUsersByRole = async (pickedOptId?: any) => {
        const role = pickedOptId || null;
        try {
            const response = await fetch(`http://localhost:3000/usersById?role=${role}`)
            const data = await response.json();
            setUsers(data);
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
                await fetch(apiRoutes.deleteUser(selectedId), {
                    method: 'DELETE'
                });
                setShowModal(false);
                setSelectedId(null);
                getUsers();
            } catch (error: any) {
                setError(error)
            }
        }
    };
    //#endregion

    if (loading) return <TablesSkeleton />;
    if (error) return <p>Error: {error}</p>;
    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full">
                <div className='py-3 px-2 shadow-lg flex justify-between items-center'>
                    <div className="hidden xl:block">
                        <Link to={"AddUser"}>
                            <Button text="New User" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
                        </Link>
                    </div>
                    <div>
                        <Select
                            styles={customStyle}
                            options={roleOptions}
                            components={{ Option: CustomSelect }}
                            onChange={(opt) => getUsersByRole(opt?.value)}
                            placeholder="All Users"
                            noOptionsMessage={() => "No Users Found!"}
                            isSearchable={true}
                        />
                    </div>
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
                            </div>
                        </div>
                    )}
                </div>
                {users.length ? (
                    <>
                        <table >
                            <thead>
                                <tr>
                                    <th scope="col">FullName</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Command</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <div className="flex items-center gap-2 ">
                                                <img className="w-[8vh] h-[8vh] rounded-full" srcSet="/Images/1.jpg" alt={user.fullName} />
                                                <p>{user.fullName ? user.fullName : "None"}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{user.role ? user.role.name : "No Role"}</p>
                                        </td>
                                        <td>
                                            <p className="text-green-500">Active</p>
                                        </td>
                                        <td className="flex gap-3">
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
                                                <EllipsisHorizontalIcon onClick={() => toggleMenu(user._id)}
                                                    className="w-9 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-100 cursor-pointer rounded-full p-1" />
                                                {isOpenUserDetil === user._id && (
                                                    <div className="absolute z-50 dark:bg-gray-800 transition-all duration-300 bg-gray-200 right-2 top-full p-2 rounded-lg">
                                                        <div className="flex flex-col gap-1">
                                                            <Button
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
                    </>
                ) : (
                    <div className="m-10">
                        <p className="text-lg font-semibold">No Users To Display</p>
                    </div>
                )}
            </div>
            <Modal title="Are you sure you want to delete this User?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
                <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
                <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
            </Modal>
        </>
    )
}

export default UsersList
