import { useNavigate, useSubmit } from "react-router-dom";
import { Button } from "../../../Elements/Buttons";
import "../User.css";
import { useState } from "react";
import axios from "axios";
import api from "../../../../Constants/apiRoutes";
function AddUser() {
  const [users, setUsers] = useState({
    UserName: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    ConfirmPassword: "",
    Role:"User",
    CreatedAt:Date.now()
  });

  const navigate = useNavigate();

  const onSave = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post(api.createUser, users, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => console.log(res));
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };
  return (
    <>
      <form onSubmit={onSave}>
        <div className="container mx-auto my-4 px-4 lg:px-20">
          <div className="structure">
            <div className="flex">
              <h1 className="font-bold text-3xl">New User</h1>
            </div>
            {/* Inputs */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-1 2xl:grid-cols-2 mt-5">
              {/* UserName */}
              <input
                name="UserName"
                className="inp"
                type="text"
                value={users.UserName}
                onChange={handleInputChange}
                placeholder="UserName"
                required
                maxLength={45}
              />
              <input
                className="inp"
                name="Email"
                type="email"
                value={users.Email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                maxLength={65}
              />
              <input
                className="inp"
                name="PhoneNumber"
                type="text"
                value={users.PhoneNumber}
                onChange={handleInputChange}
                placeholder="PhoneNumber"
                required
                max={11}
                maxLength={11}

              />
              <input
                name="Password"
                className="inp"
                type="password"
                value={users.Password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                maxLength={100}
              />

              {/* ConfirmPassword */}
              <input
                name="ConfirmPassword"
                className="inp"
                type="password"
                value={users.ConfirmPassword}
                onChange={handleInputChange}
                placeholder="ConfirmPassword"
                required
                maxLength={100}
              />
            </div>
            {/* Image */}
            {/* <div className="my-5">
            <input type="file" name="File" />
          </div>
          <DropDown /> */}

            <div className="my-4 w-1/2 lg:w-1/4">
              <Button onClick={useSubmit} text="Create" color="bg-green-700" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default AddUser;
