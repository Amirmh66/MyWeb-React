import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { IUser } from '../../../../../Types/Interfaces';



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
      const res = await axios.get(api.getUserById(id));
      setUsers(res.data);
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
        <div className="UserInfo">
          <UserCircleIcon className="w-9 text-orange-300" />
          <p>
            Info UserName : <span className="underline">{users?.userName}</span>
          </p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="th">
                <p>FullName</p>
              </th>
              <th className="th">
                <p>Email</p>
              </th>
              <th className="th">
                <p>PhoneNumber</p>
              </th>
              <th className="th">
                <p>Role</p>
              </th>
              <th className="th">
                <p>Status</p>
              </th>
              <th className="th">
                <p>CreatedAt</p>
              </th>
              <th className="th">
                <p>UpdateAt</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td">
                <h5>{users.fullName ? (users.fullName) : (<p className="text-lg font-semibold">~</p>)}</h5>
              </td>
              <td className="td">
                <h5>{users.email}</h5>
              </td>

              <td className="td">
                <h5>{users.phoneNumber ? (users.phoneNumber) : (<p className="text-lg font-semibold">~</p>)}</h5>
              </td>

              <td className="td">
                <h5>{users.role.name}</h5>
              </td>

              <td className="td">
                <span className="text-green-500 font-semibold">{users.status}</span>
              </td>
              <td className="td">
                <p>{users.createdAt.toString()}</p>
              </td>
              <td className="td">
                <p>{users.updatedAt ? (users.updatedAt.toString()) : (<p className="text-lg font-semibold">~</p>)}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MoreInfo;
