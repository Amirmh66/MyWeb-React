import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../../Constants/apiRoutes";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { IUser } from '../../../../../Types/Interfaces';
import { formattedDate } from "../../Blog/Utilities/Conditions";

interface IAPIResponse {
  status: string
  data: IUser
}

function MoreInfo() {
  const [users, setUsers] = useState<IUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    GetUserById();
  }, []);

  //#region GetUserById
  const GetUserById = async () => {
    try {
      const res = await fetch(api.getUserById(id));
      const data: IAPIResponse = await res.json();
      setUsers(data.data);
    } catch (error: any) {
      setError(error.messaage);
    } finally {
      setLoading(false);
    }
  };
  //#endregion

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!users) return <p>Error!</p>
  return (
    <>

      <div className="bg-white dark:bg-gray-800 rounded-md p-2 drop-shadow">
        <table>
          <thead>
            <tr>
              <th>
                <p>FullName</p>
              </th>
              <th>
                <p>Email</p>
              </th>
              <th>
                <p>PhoneNumber</p>
              </th>
              <th>
                <p>Role</p>
              </th>
              <th>
                <p>Status</p>
              </th>
              <th>
                <p>CreatedAt</p>
              </th>
              <th>
                <p>UpdateAt</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h5>{users.fullName ? (users.fullName) : (<p className="text-lg font-semibold">~</p>)}</h5>
              </td>
              <td>
                <h5>{users.email}</h5>
              </td>

              <td>
                <h5>{users.phoneNumber ? (users.phoneNumber) : (<p className="text-lg font-semibold">~</p>)}</h5>
              </td>

              <td>
                <h5>{users.role.name}</h5>
              </td>

              <td>
                <span className="text-green-500 font-semibold">{users.status}</span>
              </td>
              <td>
                <p>{formattedDate(users.createdAt)}</p>
              </td>
              <td>
                <p>{formattedDate(users.updatedAt)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MoreInfo;
