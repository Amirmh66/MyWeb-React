import { useEffect, useState } from "react";
import "./User.css";
import '../../GlobalStyle/Glogbal.css'
import type { IUser } from "../../../Types/Interfaces";
import { Button } from "../../Elements/Buttons";

export default function User() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    //#region GetAllUser
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/Users");
        if (!response.ok) {
          throw new Error("Network Response was not Ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch ({ error }: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    //#endregion
    fetchUsers();
  }, []);

  //#region DeleteUser
  const deleteUser = async (Id: string) => {
    try {
      const response = await fetch("http://localhost:3000/Users/"+`${Id}`,{
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.Id !== Id));
      } else {
        console.log("Failed To Delete The User");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //#endregion

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ul className="ul-user">
        {users.map((user) => (
          <li  key={user.Id}>
            <table>
              <thead>
                <tr>
                  <td>
                    <p>Name</p>
                  </td>

                  <td>
                    {" "}
                    <p>Email</p>
                  </td>
                  <td>
                    {" "}
                    <p>PhoneNumber</p>
                  </td>
                  <td>
                    {" "}
                    <p>AccessLevel</p>
                  </td>

                  <td>
                    {" "}
                    <p>Status</p>
                  </td>

                  <td>
                    <p>Command</p>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* Name */}
                  <td>
                    <h5>{user.Name}</h5>
                  </td>
                  {/* Email */}
                  <td>
                    <h5>{user.Email}</h5>
                  </td>
                  {/* PhoneNumber */}
                  <td>
                    <h5>{user.PhoneNumber}</h5>
                  </td>
                  {/* Role */}
                  <td>
                    <h5>{user.AccessLevel}</h5>
                  </td>
                  {/* Status */}
                  <td className="Status">
                    <p className="">Active</p>
                  </td>
                  {/* Buttuns */}
                  <td>
                    <Button text="Delete" color={'bg-red-600'}  onClick={() => deleteUser(user.Id)}/>
                    <Button text="Edit Info" color={'bg-blue-500'}/>
                    <Button text="More Info" color={'bg-yellow-500'}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </>
  );
}
