import { useNavigate, useParams, useSubmit } from "react-router-dom";
import Button from "../../../../Elements/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import * as yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Warning } from "../../../../Elements/Icons";

function EditRole() {
  const [initialValues, setinitialValues] = useState({
    name: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRole();
  }, [id]);
  const getRole = async () => {
    try {
      const response = await axios.get(api.getRoleById(id));
      const data = await response.data;
      setinitialValues({
        name: data.name,
      });
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  const onSave = async (values: any) => {
    try {
      await axios.patch(api.updateRole(id), values);
      navigate("/PanelAdmin/Roles");
    } catch ({ error }: any) {
      setError(error);
    }
  };
  const validRole = yup.object().shape({
    name: yup.string().max(45).required("Name is required"),
  });
  return (
    <>
      <Formik
        onSubmit={onSave}
        initialValues={initialValues}
        validationSchema={validRole}
        enableReinitialize={true}
      >
        <Form>
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <div className="structure">
              <h1 className="font-bold text-3xl">Edit Role</h1>
              {error && (
                <p className="error">
                  <Warning />
                  {error}
                </p>
              )}
              <div className="mt-5">
                <Field name="name" type="text" placeholder="Name(required)" />
                <ErrorMessage
                  name="name"
                  className="text-red-600"
                  component="p"
                />
              </div>
              <div className="my-4">
                <Button
                  onClick={useSubmit}
                  text="Edit"
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
export default EditRole;
