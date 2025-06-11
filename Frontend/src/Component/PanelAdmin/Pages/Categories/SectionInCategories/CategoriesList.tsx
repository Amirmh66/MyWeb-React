import { useEffect, useState } from 'react'
import { ICategories } from '../../../../../Types/Interfaces';
import TablesSkeleton from '../../../../Elements/TablesSkeleton';
import { Link } from 'react-router-dom';
import Button from '../../../../Elements/Buttons';
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import Modal from '../../../../Elements/Modal';
import apiRoutes from '../../../../../Constants/apiRoutes';

interface IAPIResponse {
  status: string;
  data: ICategories[]
}

function CategoriesList() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //#region GetAllCategories
  useEffect(() => {
    getCategories();
  }, [categories]);
  const getCategories = async () => {
    try {
      const response = await fetch(apiRoutes.getCategories);
      if (!response.ok) {
        setError("Error Unexpected!")
      }
      if (response.ok) {
        const data: IAPIResponse = await response.json();
        setCategories(data.data);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  //#endregion
  //#region DeleteCategory
  const handleDelete = (categoryId: string) => {
    setShowModal(true);
    setSelectedId(categoryId);
  };
  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await fetch(apiRoutes.deleteCategory(selectedId), {
          method: 'DELETE'
        });
        setShowModal(false);
        setSelectedId(null);
        getCategories();
      } catch (error: any) {
        setError(error)
      }
    }
  };
  //#endregion

  if (loading) return <TablesSkeleton />
  if (error) return <p>Error: {error}</p>
  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full">
        <div className='py-3 px-2 shadow-lg flex justify-between items-center'>
          <Link to="addCategory">
            <Button text="Create New Category" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Command</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id}>
                <td>
                  <p>{c.name}</p>
                </td>
                <td className='flex gap-2'>
                  <Button
                    onClick={() => handleDelete(c._id)}
                    text="Delete"
                    icon={<TrashIcon className="w-5" />}
                    className="bg-red-600"
                  />
                  <Link to={`EditCategory/${c._id}`}>
                    <Button text="Edit" icon={<PencilSquareIcon className="w-5" />} className="bg-blue-600" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal title="Are you sure you want to delete this Category?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
    </>
  )
}

export default CategoriesList
