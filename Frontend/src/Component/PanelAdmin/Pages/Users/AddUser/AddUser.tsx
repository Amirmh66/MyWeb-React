import { useNavigate, useSubmit } from "react-router-dom";
import Button from "../../../../Elements/Buttons";
import "../User.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SuccessMes from "../../../../Elements/SuccessMes";
import validateUser from "../../../../../Validations/UserValidation";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import apiRoutes from "../../../../../Constants/apiRoutes";

interface IRoles {
  _id: string;
  name: string;
}

function AddUser() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState<IRoles[]>([]);
  const redirect = useNavigate();
  const [isSendRequest, setIsSendRequest] = useState(true);

  //#region OnSubmit
  const onSave = async (values: any) => {
    try {
      setIsSubmitting(true)
      await axios.post(apiRoutes.createUser, values).then(() => {
        redirect("/PanelAdmin/Users");
        alert("Register Successfully.");
      });
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsSubmitting(false)
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

  const onCancle = () => {
    setShowConfirm(false);
  };

  const initialValues = {
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: '',
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
              <h1 className="font-bold text-3xl uppercase">
                <span className="underline underline-offset-4">New</span> User
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
                    placeholder="FullName"
                    className="input"
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
                      className="input"
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
                      className="input"
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
                    className="input"
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
                    className="input"
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
                    className="input"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="Roles">Roles</label>
                  <div className="flex">
                    {roles.map((r) => (
                      <div key={r._id} className="m-1 border p-1 rounded-lg flex gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <Field type="radio" name="role" value={r._id} />
                        <label>{r.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="my-4">
                <Button
                  disable={isSubmitting}
                  text={isSubmitting ? "Loading..." : "Create"}
                  className="bg-green-700 px-7"
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
