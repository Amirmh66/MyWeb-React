import Modal from '../../../../Elements/Modal'
import Button from '../../../../Elements/Buttons'
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import apiRoutes from '../../../../../Constants/apiRoutes';

interface IRoles {
    _id: string;
    name: string;
}
interface IAPIResponse {
    status: string;
    data: IRoles[]
}

function RoleList() {
    const [roles, setRoles] = useState<IRoles[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    //#region GetAllRoles
    useEffect(() => {
        getRoles();
    }, []);
    const getRoles = async () => {
        setLoading(true)
        try {
            const response = await fetch(apiRoutes.getRoles);
            const data: IAPIResponse = await response.json()
            setRoles(data.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    //#endregion
    //#region DeleteRole
    const handleDelete = (roleId: string) => {
        setSelectedId(roleId);
        setShowModal(true);
    };

    const ConfirmDelete = async () => {
        if (selectedId) {
            try {
                await fetch(apiRoutes.deleteRole(selectedId), {
                    method: 'DELETE'
                });
                setShowModal(false);
                setSelectedId(null);
                getRoles();
            } catch ({ error }: any) {
                setError(error);
            }
        }
    };
    //#endregion

    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full">
                <div className='py-3 px-2 shadow-lg flex justify-between items-center'>
                    <Link to="AddRole">
                        <Button text="Create Role" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Role Name</th>
                            <th scope="col">Command</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role._id}>
                                <td>
                                    <p>{role.name}</p>
                                </td>
                                <td>
                                    <Button onClick={() => handleDelete(role._id)} text="Delete"
                                        icon={<TrashIcon className="w-5" />} className="bg-red-500" />
                                    <Link to={`EditRole/${role._id}`}>
                                        <Button icon={<PencilSquareIcon className="w-5" />} text="Edit Role"
                                            className={"bg-blue-500"} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal title="Are you sure you want to delete this Role?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
                <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
                <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
            </Modal>
        </>
    )
}

export default RoleList
