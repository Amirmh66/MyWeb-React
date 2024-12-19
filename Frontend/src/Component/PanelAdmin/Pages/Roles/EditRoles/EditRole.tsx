import { useNavigate, useParams, useSubmit } from "react-router-dom";
import Button from "../../../../Elements/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import * as yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import "../Roles.css";
import LoadingText  from "../../../../Elements/LoadingText";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

function EditRole() {
  const [initialValues, setinitialValues] = useState({
    name: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //#region GetRole
  useEffect(() => {
    getRole();
  }, [id]);
  const getRole = async () => {
    try {
      await axios.get(api.getRoleById(id)).then((res) => {
        setinitialValues({
          name: res.data.name,
        });
      });
    } catch (error: any) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  //#endregion 
  //#region OnSubmit
  const onSave = async (values: any) => {
    try {
      await axios.patch(api.updateRole(id), values).then(() => {
        navigate("/PanelAdmin/Roles");
      });
    } catch (error: any) {
      setError(error);
    }
  };
  //#endregion 

  const validRole = yup.object().shape({
    name: yup.string().max(40).required("Name is required"),
  });

  if (loading) return <LoadingText />;

  return (
    <>
      <Formik
        onSubmit={onSave}
        initialValues={initialValues}
        validationSchema={validRole}
        enableReinitialize={true}
      >
        <Form>
          <div className="px-24">
            <div className="structure-roles">
              <h1 className="font-bold text-3xl">
                <span className="underline underline-offset-4">Edit</span>Role
              </h1>
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
              <div className="my-5">
                <Field
                  name="name"
                  type="text"
                  className="input lowercase"
                  placeholder="Name(required)"
                />
                <ErrorMessage
                  name="name"
                  className="text-red-600"
                  component="p"
                />
              </div>
              <div>
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
