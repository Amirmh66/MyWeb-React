import { Link, Outlet, useLocation } from 'react-router-dom'
import Button from '../../../Elements/Buttons'
import { useEffect, useState } from 'react'
import axios from 'axios';
import apiRoutes from '../../../../Constants/apiRoutes';
import Alert from '../../../Elements/Alert';
import { ArrowPathIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import TablesSkeleton from '../../../Elements/TablesSkeleton';

interface ITypes {
  _id: string;
  typeName: string;
  description: string;
}

function Types() {
  const [isSendRequest, setIsSendRequest] = useState(true);
  const [types, setTypes] = useState<ITypes[]>([])
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
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
    setShowAlert(true);
  };

  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(apiRoutes.deleteTypeById(selectedId));
        setShowAlert(false);
        setSelectedId(null);
        getTypes();
      } catch (error: any) {
        setError(error.response.data.message);
      }
    }
  };
  const CancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };
  //#endregion 

  if (error) return error
  if (isSendRequest) return <TablesSkeleton />;

  return (
    <>
      {location.pathname === "/PanelAdmin/Types" ? (
        <div>
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
          <div className="boxTable">
            <div className="overflow-auto" style={{ maxHeight: "490px" }}>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th scope="col">Type Name</th>
                    <th scope="col">Command</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {types.map((t) => (
                    <tr
                      key={t._id}
                      className="hover:bg-gray-300 dark:hover:bg-gray-900"
                    >
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
        </div>
      ) : (
        <Outlet />
      )}

      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This Type?"
          onCancle={CancelDelete}
          onConfirm={ConfirmDelete}
        />
      )}
    </>
  )
}

export default Types