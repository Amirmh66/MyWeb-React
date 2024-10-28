import axios from "axios";
import { useEffect, useState } from "react";
import "../User.css";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import Button from "../../../../Elements/Buttons";
import api from "../../../../../Constants/apiRoutes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IRoles } from "../../../../../Types/Interfaces";
import { Warning } from "../../../../Elements/Icons";
import validateUser from "../../../../../Validations/UserValidation";
function EditUser() {
  const { id } = useParams();
  const [roles, setRoles] = useState<IRoles[]>([]);
  const redirect = useNavigate();
  const [error, setErorr] = useState("");
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: null,
    password: "",
    role: "",
  });
  useEffect(() => {
    getUser();
  }, [id]);

  const getUser = async () => {
    try {
      const response = await axios.get(api.getUserById(id));
      const data = response.data;
      setInitialValues({
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: "",
        role: data.role,
      });
    } catch (error: any) {
      setErorr(error.response.data);
    }
  };

  useEffect(() => {
    getRoles();
  });

  const getRoles = async () => {
    try {
      const response = await axios.get(api.getRoles);
      setRoles(response.data);
    } catch (error: any) {
      setErorr(error.response.data);
    }
  };

  const onSave = async (values: any) => {
    try {
      await axios.patch(api.updateUser(id), values);
      redirect("/PanelAdmin/Users");
    } catch (error: any) {
      setErorr(error.response.data);
    }
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateUser}
        onSubmit={onSave}
        enableReinitialize={true}
      >
        <Form>
          <div className="px-10">
            <div className="structure-user">
              <h1 className="font-bold text-3xl">Edit User</h1>
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
                    placeholder="FullName(required)"
                  />
                  <ErrorMessage
                    name="fullName"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <div>
                    <Field
                      name="userName"
                      type="text"
                      placeholder="UserName(required)"
                    />
                    <ErrorMessage
                      name="userName"
                      component={"p"}
                      className="text-red-600"
                    />
                  </div>
                  <div>
                    <Field
                      name="phoneNumber"
                      type="number"
                      placeholder="PhoneNumber(optional)"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component={"p"}
                      className="text-red-600"
                    />
                  </div>
                </div>
                <div>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Email(required)"
                  />
                  <ErrorMessage
                    name="email"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    type="text"
                    placeholder="Password(required)"
                  />
                  <ErrorMessage
                    name="password"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>
                <div>
                  <Field
                    name="confirmPassword"
                    type="text"
                    placeholder="ConfirmPassword(required)"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>

                <div>
                  <Field name="role" as="select" className="DropDown">
                    {roles.map((role) => (
                      <option value={role.name} key={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="role"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>
              </div>

              <div className="my-4">
                <Button
                  onClick={useSubmit}
                  text="Edit"
                  className="bg-blue-700"
                />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default EditUser;
