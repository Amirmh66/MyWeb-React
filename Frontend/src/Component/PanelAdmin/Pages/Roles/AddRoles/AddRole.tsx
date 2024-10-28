import Button from "../../../../Elements/Buttons";
import { useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { useSubmit } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SuccessMes from "../../../../Elements/SuccessMes";
import * as yup from "yup";
import { Warning } from "../../../../Elements/Icons";

function AddRole() {
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSave = async (values: any) => {
    try {
      await axios.post(api.createRole, values);
      setShowConfirm(true);
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

  const onCancle = () => {
    setShowConfirm(false);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSave}
        validationSchema={validRole}
      >
        <Form autoComplete="off">
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <div className="structure">
              <h1 className="font-bold text-3xl">New Role</h1>
              <div className="mt-5">
                {error && (
                  <p className="error">
                    <Warning />
                    {error}
                  </p>
                )}

                <div>
                  <label htmlFor="Role">RoleName</label>
                  <Field
                    name="name"
                    type="text"
                    className="lowercase"
                    placeholder="etc:admin"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-500"
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
        <SuccessMes onCancle={onCancle} message={"Create Role Successfully!"} />
      )}
    </>
  );
}
export default AddRole;
