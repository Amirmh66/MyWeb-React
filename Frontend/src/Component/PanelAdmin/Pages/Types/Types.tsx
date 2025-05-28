import { Link, Outlet, useLocation } from 'react-router-dom'
import Button from '../../../Elements/Buttons'
import { useEffect, useState } from 'react'
import axios from 'axios';
import apiRoutes from '../../../../Constants/apiRoutes'
import { ArrowPathIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import TablesSkeleton from '../../../Elements/TablesSkeleton';
import Modal from '../../../Elements/Modal';
interface ITypes {
  _id: string;
  typeName: string;
  description: string;
}
function Types() {
  const [isSendRequest, setIsSendRequest] = useState(true);
  const [types, setTypes] = useState<ITypes[]>([])
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();
  //#region GetTypes
  useEffect(() => {
    if (isSendRequest) {
      getTypes();
    }
  }, [isSendRequest]);
  const getTypes = async () => {
    try {
      await axios.get(apiRoutes.getTypes).then((response) => {
        const types = response.data;
        setTypes(types);
      })
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsSendRequest(false);
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
        await axios.delete(apiRoutes.deleteTypeById(selectedId));
        setShowModal(false);
        setSelectedId(null);
        getTypes();
      } catch (error: any) {
        setError(error.response.data.message);
      }
    }
  };
  //#endregion 
  if (error) return error
  if (isSendRequest) return <TablesSkeleton />
  return (
    <>
      {location.pathname === "/PanelAdmin/Types" ? (
        <>
          <div className="table-nav">
            <Link to="AddType">
              <Button text="CreateNewType" icon={<PlusCircleIcon className='w-5' />} className="bg-green-500" />
            </Link>
            <Button
              text="RefreshTypeTable"
              icon={<ArrowPathIcon className='w-5' />}
              className="bg-blue-500"
              onClick={getTypes}
            />
          </div>
          <div>
            <div className="overflow-auto" style={{ maxHeight: "490px" }}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Type Name</th>
                    <th scope="col">Command</th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((t) => (
                    <tr key={t._id}>
                      <td>{t.typeName}</td>
                      <td className="btn-Sec-InForm">
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
          </div>
        </>
      ) : (
        <Outlet />
      )}
      <Modal title="Are You Sure You Want to Delete This Type?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
    </>
  )
}
export default Types