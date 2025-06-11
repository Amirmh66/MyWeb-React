import { useEffect, useState } from 'react'
import apiRoutes from '../../../../../Constants/apiRoutes';
import Modal from '../../../../Elements/Modal';
import Button from '../../../../Elements/Buttons';
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import LoadingText from '../../../../Elements/LoadingText';

interface ITypes {
    _id: string
    name: string
    category: ICategory
}

interface ICategory {
    _id: string
    name: string
}

interface IAPIResponse {
    status: string;
    data: ITypes[]
}

function TypeList() {
    const [types, setTypes] = useState<ITypes[]>([])
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    //#region GetTypes
    useEffect(() => {
        getTypes();
    }, []);
    const getTypes = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(apiRoutes.getTypes)
            const types: IAPIResponse = await response.json();
            setTypes(types.data)
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    //#endregion 
    //#region HandlDelete
    const handleDelete = (typeId: string) => {
        setSelectedId(typeId);
        setShowModal(true);
    };

    const ConfirmDelete = async () => {
        if (selectedId) {
            try {
                await fetch(apiRoutes.deleteTypeById(selectedId), {
                    method: 'DELETE'
                });
                setShowModal(false);
                setSelectedId(null);
                getTypes();
            } catch (error: any) {
                setError(error.response.data.message);
            }
        }
    };
    //#endregion 

    if (error) return <span className='error'>{error}</span>
    if (isLoading) return <LoadingText />
    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full">
                <div className="py-3 px-2 shadow-lg flex justify-between items-center">
                    <Link to="AddType">
                        <Button text="Create New Type" icon={<PlusCircleIcon className='w-5' />} className="bg-green-500" />
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Command</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map((t) => (
                            <tr key={t._id}>
                                <td>
                                    <p className='font-semibold text-sm'>{t.name}</p>
                                </td>
                                <td>
                                    <p>{t.category.name}</p>
                                </td>
                                <td className='flex gap-2'>
                                    <Button
                                        onClick={() => handleDelete(t._id)}
                                        text="Delete"
                                        icon={<TrashIcon className='w-5' />}
                                        className="bg-red-600"
                                    />
                                    <Link to={`EditType/${t._id}`}>
                                        <Button text="Edit" icon={<PencilSquareIcon className='w-5' />} className="bg-blue-600" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal title="Are you sure you want to delete this Type?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
                <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
                <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
            </Modal>
        </>
    )
}

export default TypeList
