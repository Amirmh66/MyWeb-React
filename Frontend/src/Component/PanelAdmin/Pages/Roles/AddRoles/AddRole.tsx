import Button from "../../../../Elements/Buttons";
import { useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { useNavigate, useSubmit } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import "../Roles.css";

function AddRole() {
  const [error, setError] = useState<string | null>(null);
  const redirect = useNavigate();

  const onSave = async (values: any, resetForm: any) => {
    try {
      await axios.post(api.createRole, values).then(() => {
        redirect("/PanelAdmin/Roles");
        resetForm();
      });
    } catch (error: any) {
      setError(error.response.data);
    }
  };
  const initialValues = {
    name: "",
  };

  const validRole = yup.object().shape({
    name: yup.string().max(20).required("Name is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSave}
        validationSchema={validRole}
      >
        <Form autoComplete="off">
          <div className="px-4 lg:px-20">
            <div className="structure-roles">
              <h1 className="font-bold text-3xl">
                <span className="underline underline-offset-4">New</span> Role
              </h1>
              <div className="my-5">
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
                  <label htmlFor="Role">RoleName</label>
                  <Field
                    name="name"
                    id="Role"
                    type="text"
                    className="lowercase input"
                    placeholder="etc:admin"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-500"
                    component="p"
                  />
                </div>
              </div>
              <div>
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
    </>
  );
}
export default AddRole;
