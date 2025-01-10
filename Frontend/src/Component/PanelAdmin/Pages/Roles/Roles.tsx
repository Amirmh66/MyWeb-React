import { useEffect, useState } from "react";
import Button from "../../../Elements/Buttons";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
import Alert from "../../../Elements/Alert";
import { ArrowPathIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import TablesSkeleton from "../../../Elements/TablesSkeleton";



interface IRoles {
  _id: string;
  name: string;
}

function Roles() {

  const [roles, setRoles] = useState<IRoles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertAll, setShowAlertAll] = useState(false);
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
    setShowAlert(true);
  };

  const ConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(api.deleteRole(selectedId));
        setShowAlert(false);
        setSelectedId(null);
        getRoles();
      } catch ({ error }: any) {
        setError(error);
      }
    }
  };
  const CancelDelete = () => {
    setShowAlert(false);
    setSelectedId(null);
  };
  //#endregion
  //#region DeleteRoles
  const handleDeleteAll = () => {
    setShowAlertAll(true);
  };

  const ConfirmDeleteAll = async () => {
    try {
      await axios.delete(api.deleteAllRoles).then(() => {
        setShowAlertAll(false);
        getRoles();
      });
    } catch (error: any) {
      setError(error);
    }
  };
  const CancelDeleteAll = () => {
    setShowAlertAll(false);
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
              onClick={handleDeleteAll}
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

      {showAlert && (
        <Alert
          message="Are You Sure You Want to Delete This Role?"
          onCancle={CancelDelete}
          onConfirm={ConfirmDelete}
        />
      )}
      {showAlertAll && (
        <Alert
          message="Warning: This action will delete all data, but do you want to do it?"
          onCancle={CancelDeleteAll}
          onConfirm={ConfirmDeleteAll}
        />
      )}
    </>
  );
}
export default Roles;
