import Modal from '../../../../Elements/Modal'
import Button from '../../../../Elements/Buttons'
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from 'react';
import TablesSkeleton from '../../../../Elements/TablesSkeleton';
import { Link } from 'react-router-dom';
import { IProduct } from '../../../../../Types/Interfaces';
import apiRoutes from '../../../../../Constants/apiRoutes';

interface IAPIResponse {
    status: string;
    data: IProduct[]
}
function ProductList() {
    const [products, setProduct] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [limit] = useState(9);

    //#region getProduct
    useEffect(() => {
        getProduct()
    }, [products]);
    const getProduct = async () => {
        try {
            const response = await fetch(apiRoutes.getProducts(limit));
            if (response.ok) {
                const data:IAPIResponse  = await response.json();
                setProduct(data.data);
            }
        } catch (error: any) {
            if (error.message === 'Network Error') {
                setError("Server Can't Response")
            }
        } finally {
            setLoading(false);
        }
    };
    //#endregion
    //#region DeleteProduct
    const handleDelete = (productId: string) => {
        setSelectedId(productId);
        setShowModal(true);
    };
    const ConfirmDelete = async () => {
        if (selectedId) {
            try {
                await fetch(apiRoutes.deleteProduct(selectedId), {
                    method: 'DELETE'
                }).then((response) => {
                    if (response.ok) {
                        setShowModal(false);
                        setSelectedId(null);
                        getProduct();
                    }
                })
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
                    <Link to={"AddProduct"}>
                        <Button text="New Product" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Command</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length < 0 ? "Noting" : (products.map((p) => (
                            <tr key={p._id} >
                                <td>
                                    <img
                                        className="w-14 h-12 rounded-xl text-xs"
                                        srcSet="/Images/1.jpg"
                                        alt={p.name}
                                    />
                                </td>

                                <td className="w-[200px]">
                                    <p className='font-semibold line-clamp-1'>{p.name}</p>
                                </td>
                                <td>
                                    {p.stock > 9 ? (<p className="text-green-500">Avaliable</p>)
                                        : (<p className="text-red-600">{`Only ${p.stock} left`}</p>)}
                                </td>
                                <td>
                                    <p className='font-semibold'>{p.stock}</p>
                                </td>
                                <td>
                                    <p className='font-semibold'>${p.price}</p>
                                </td>
                                <td className='flex gap-2'>
                                    <Button
                                        onClick={() => handleDelete(p._id)}
                                        icon={<TrashIcon className="w-5" />}
                                        text="Delete"
                                        className="bg-red-500"
                                    />
                                    <Link to={`EditProduct/${p._id}`}>
                                        <Button text="Edit" icon={<PencilSquareIcon className="w-5" />} className="bg-yellow-500" />
                                    </Link>
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
            <Modal title="Are you sure you want to delete this product?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
                <Button className="bg-red-600 hover:bg-red-700" text="Delete" onClick={ConfirmDelete} />
                <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
            </Modal>
        </>
    )
}

export default ProductList
