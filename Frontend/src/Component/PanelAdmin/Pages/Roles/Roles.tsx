import { useEffect, useState } from "react";
import Button from "../../../Elements/Buttons";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes"
import { ArrowPathIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import TablesSkeleton from "../../../Elements/TablesSkeleton";
import Modal from "../../../Elements/Modal";



interface IRoles {
  _id: string;
  name: string;
}

function Roles() {

  const [roles, setRoles] = useState<IRoles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalAll, setShowModalAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const location = useLocation();

  //#region GetAllRoles
  useEffect(() => {
    getRoles();
  }, []);
  const getRoles = async () => {
    try {
      const response = await axios(api.getRoles);
      const data = response.data;
      setRoles(data);
    } catch ({ error }: any) {
      setError(error.message);
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
        await axios.delete(api.deleteRole(selectedId));
        setShowModal(false);
        setSelectedId(null);
        getRoles();
      } catch ({ error }: any) {
        setError(error);
      }
    }
  };
  //#endregion
  //#region DeleteRoles

  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllRoles).then(() => {
        setShowModalAll(false);
        getRoles();
      });
    } catch (error: any) {
      setError(error);
    }
  };
  //#endregion

  if (loading) return <TablesSkeleton />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {location.pathname === "/PanelAdmin/Roles" ? (
        <div>
          <div className="table-nav justify-start">
            <Link to="AddRole">
              <Button text="Create Role" icon={<PlusCircleIcon className="w-5" />} className="bg-green-500" />
            </Link>
            <Button
              text="Refresh Role Table"
              icon={<ArrowPathIcon className="w-5" />}
              className="bg-blue-500"
              onClick={getRoles}
            />
            <Button
              text="Delete All Roles"
              icon={<TrashIcon className="w-5" />}
              className="bg-red-800"
              onClick={() => setShowModalAll(true)}
            />
          </div>
          <div className="boxTable">
            <div className="overflow-auto" style={{ maxHeight: "490px" }}>
              <table className="table">
                <thead className="thead">
                  <tr>
                    <th scope="col">Role Name</th>
                    <th scope="col">Command</th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {roles.map((role) => (
                    <tr
                      key={role._id}
                      className="hover:bg-gray-300 dark:hover:bg-gray-900"
                    >
                      <td>
                        <p className="uppercase">{role.name}</p>
                      </td>
                      <td className="btn-Sec-InForm">
                        <Button
                          onClick={() => handleDelete(role._id)}
                          text="Delete"
                          icon={<TrashIcon className="w-5" />}
                          className="bg-red-500"
                        />
                        <Link to={`EditRole/${role._id}`}>
                          <Button
                            icon={<PencilSquareIcon className="w-5" />}
                            text="Edit Role"
                            className={"bg-blue-500"}
                          />
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
      <Modal title="Are You Sure You Want to Delete This Role?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModal} onClose={() => setShowModal}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDelete} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModal(false)} />
      </Modal>
      <Modal title="Warning: This action will delete all data, but do you want to do it?" icon={<TrashIcon className="w-14 text-red-500" />} isOpen={showModalAll} onClose={() => setShowModalAll}>
        <Button className="bg-red-600" text="Delete" onClick={ConfirmDeleteAll} />
        <Button className="bg-slate-400" text="Cancel" onClick={() => setShowModalAll(false)} />
      </Modal>
    </>
  );
}
export default Roles;
