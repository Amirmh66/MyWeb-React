import axios from "axios";
import { useEffect, useState } from "react";
import "../User.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../Elements/Buttons";
import api from "../../../../../Constants/apiRoutes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import validateUser from "../../../../../Validations/UserValidation";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import apiRoutes from "../../../../../Constants/apiRoutes";

interface IRoles {
  _id: string;
  name: string;
}

function EditUser() {
  const { id } = useParams();
  const [roles, setRoles] = useState<IRoles[]>([]);
  const redirect = useNavigate();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSendRequest, setIsSendRequest] = useState(true);
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: null,
    password: "",
    role: "",
  });
  //#region GetUser
  useEffect(() => {
    getUser();
  }, [id]);
  const getUser = async () => {
    try {
      await axios.get(api.getUserById(id)).then((res) => {
        setError(null);
        const data = res.data;
        setInitialValues({
          fullName: data.fullName,
          userName: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: "",
          role: data.role,
        });
      });
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  //#endregion 
  //#region GetRoles
  useEffect(() => {
    if (isSendRequest) {
      getRoles();
    }
  }, [isSendRequest])
  const getRoles = async () => {
    try {
      await axios.get(apiRoutes.getRoles).then((res) => {
        setRoles(res.data)
      })
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setIsSendRequest(false);
    }
  }
  //#endregion  
  //#region OnSubmit
  const onSave = async (values: any) => {
    try {
      setIsSubmitting(true)
      await axios.patch(api.updateUser(id), values).then(() => {
        redirect("/PanelAdmin/Users");
        setError(null);
      });
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  //#endregion  

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
              <h1 className="font-bold text-3xl uppercase">
                <span className="underline underline-offset-4">Edit</span> User
              </h1>
              <div className="structInp">
                {error && (
                  <div className="flex items-center gap-1 error">
                    <span className='w-5 '>
                      <ExclamationTriangleIcon />
                    </span>
                    <p>
                      {error}
                    </p>
                  </div>
                )}
                <div>
                  <Field
                    name="fullName"
                    type="text"
                    className="input"
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
                      className="input"
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
                      className="input"
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
                    className="input"
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
                    type="password"
                    className="input"
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
                    type="password"
                    className="input"
                    placeholder="ConfirmPassword(required)"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={"p"}
                    className="text-red-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="Roles">Roles</label>
                  <div className="flex">
                    {roles.map((r) => (
                      <div key={r._id} className="m-1 border p-1 rounded-lg flex gap-2
                       hover:bg-gray-50 dark:hover:bg-gray-800">
                        <Field type="radio" name="role" value={r._id} />
                        <label>{r.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="my-4">
                <Button
                  disable={isSubmiting}
                  text={isSubmiting ? "Loading..." : "Edit"}
                  className="bg-blue-700 px-7"
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
