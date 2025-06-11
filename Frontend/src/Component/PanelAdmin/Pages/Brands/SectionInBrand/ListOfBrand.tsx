import { useEffect, useState } from 'react'
import apiRoutes from '../../../../../Constants/apiRoutes';
import { Link } from 'react-router-dom';
import Button from '../../../../Elements/Buttons';
import Modal from '../../../../Elements/Modal';
import { PencilSquareIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/20/solid'
import TablesSkeleton from '../../../../Elements/TablesSkeleton';

interface IBrand {
    _id: string
    name: string;
    logoUrl: string;
    countryOfOrigin: string;
    establishedYear: number;
}
interface IAPIResponse{
    status: string;
    data: IBrand[]
}

function ListOfBrand() {
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [isSendRequest, setIsSendRequest] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (isSendRequest) {
            getBrands();
        }
    }, [isSendRequest]);

    const getBrands = async () => {
        setError(null);
        try {
            const res = await fetch(apiRoutes.getBrands);
            const data:IAPIResponse = await res.json();
            if (res.status === 200) {
                setBrands(data.data)
            }
        } catch (error: any) {
            setError(error.response.data.message)
        } finally {
            setIsSendRequest(false);
        }
    }
    //#region DeleteBrandById
    const handleDelete = (brandId: string) => {
        setSelectedId(brandId);
        setShowModal(true);
    };
    const ConfirmDelete = async () => {
        if (selectedId) {
            try {
                const response = await fetch(apiRoutes.deleteBrand(selectedId), {
                    method: 'DELETE',
                })
                if (response.status === 200) {
                    setShowModal(false);
                    setSelectedId(null);
                    getBrands()
                }
            } catch (error: any) {
                setError(error)
            }
        }
    };
    //#endregion

    if (error) return error
    if (isSendRequest) return <TablesSkeleton />
    return (
        <>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full">
                <div className='py-3 px-2 shadow-lg flex justify-between items-center'>
                    <Link to={"CreateBrand"}>
                        <Button text="Create New Brand" icon={<PlusCircleIcon className="w-5" />}
                            className="bg-green-500" />
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Logo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Country of Origin</th>
                            <th scope="col">Established Year</th>
                            <th scope="col">Command</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((b) => (
                            <tr key={b._id}>
                                <td>
                                    <img className="w-10 h-10 rounded-full" srcSet="/Images/DarwinLowQuality.webp" />
                                </td>
                                <td>
                                    <p className='font-semibold'>{b.name}</p>
                                </td>
                                <td>
                                    <p className='font-semibold'>{b.countryOfOrigin}</p>
                                </td>
                                <td>
                                    <p className='font-semibold'>{b.establishedYear}</p>
                                </td>
                                <td title='Delete this brand' className='flex gap-1 lg:gap-3'>
                                    <Button
                                        onClick={() => handleDelete(b._id)}
                                        icon={<TrashIcon className="w-5" />}
                                        className="bg-red-600"
                                    />
                                    <Link to={`EditBrand/${b._id}`} title="Edit this brand">
                                        <Button icon={<PencilSquareIcon className="w-5" />} className="bg-blue-600" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
            <Modal title="Are You Sure You Want To Delete This Brand?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
                <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
                <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
            </Modal>
        </>
    )
}

export default ListOfBrand
