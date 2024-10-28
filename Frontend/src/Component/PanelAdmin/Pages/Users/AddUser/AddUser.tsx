import { useNavigate, useSubmit } from "react-router-dom";
import Button from "../../../../Elements/Buttons";
import "../User.css";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SuccessMes from "../../../../Elements/SuccessMes";
import validateUser from "../../../../../Validations/UserValidation";
import { IRoles } from "../../../../../Types/Interfaces";
import { Warning } from "../../../../Elements/Icons";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

function AddUser() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState<IRoles[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const redirect = useNavigate();

  function eyeOn() {
    setIsVisible(true);
  }
  function eyeOff() {
    setIsVisible(false);
  }

  useEffect(() => {
    getRoles();
  }, []);
  const getRoles = async () => {
    try {
      const response = await axios.get(api.getRoles);
      setRoles(response.data);
    } catch ({ error }: any) {
      setError(error.response.data.message);
    }
  };

  const onSave = async (values: any) => {
    try {
      await axios.post(api.createUser, values);
      redirect("/PanelAdmin/Users");
      alert("Register Successfully.");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const onCancle = () => {
    setShowConfirm(false);
  };

  const initialValues = {
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    createdAt: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSave}
        validationSchema={validateUser}
      >
        <Form>
          <div className="px-10">
            <div className="structure-user">
              <h1 className="font-bold text-3xl">New User</h1>
              <div className="structInp">
                {error && (
                  <p className="error">
                    <Warning />
                    {error}
                  </p>
                )}
                <div>
                  <Field
                    name="fullName"
                    type="text"
                    placeholder="FullName"
                    className="inp"
                  />
                  <ErrorMessage
                    name="fullName"
                    className="text-red-600"
                    component="p"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div>
                    <Field
                      name="userName"
                      type="text"
                      placeholder="userName(required)"
                      className="inp"
                    />
                    <ErrorMessage
                      name="userName"
                      className="text-red-600"
                      component="p"
                    />
                  </div>
                  <div>
                    <Field
                      name="phoneNumber"
                      type="text"
                      placeholder="phoneNumber(optional)"
                      className="inp"
                      max="11"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      className="text-red-600"
                      component="p"
                    />
                  </div>
                </div>
                <div>
                  <Field
                    name="email"
                    type="text"
                    placeholder="email(required)"
                    className="inp"
                  />
                  <ErrorMessage
                    name="email"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password(required)"
                    className="inp"
                  />
                  <ErrorMessage
                    name="password"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="ConfirmPassword(required)"
                    className="inp"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div>
                  <label htmlFor="Roles">Roles</label>
                  <Field
                    id="Roles"
                    as="select"
                    className="DropDown"
                    name="role"
                  >
                    {roles.map((role) => (
                      <option key={role._id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="role"
                    className="text-red-600"
                    component="p"
                  />
                </div>
              </div>

              <div className="my-4">
                <Button
                  onClick={useSubmit}
                  text="Create"
                  className="bg-green-700"
                />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      {showConfirm && (
        <SuccessMes onCancle={onCancle} message={"Create User Successfully!"} />
      )}
    </>
  );
}
export default AddUser;
