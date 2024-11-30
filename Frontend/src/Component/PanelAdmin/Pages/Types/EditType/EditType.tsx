import { ErrorMessage, Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import { validType } from "../../../../../Validations/TypeValidation";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Button from "../../../../Elements/Buttons";
import { LoadingText } from "../../../../Elements/Loading";
import apiRoutes from "../../../../../Constants/apiRoutes";
import axios from "axios";
import '../Types.css'

interface IType {
  typeName: string;
  description: string;
}

function EditType() {

  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialValues, setinitialValues] = useState<IType>({
    typeName: "",
    description: "",
  });

  //#region GetTypeById
  useEffect(() => {
    getTypeById();
  }, []);
  const getTypeById = async () => {
    try {
      await axios.get(apiRoutes.getTypeById(id)).then((res) => {
        setinitialValues({
          typeName: res.data.typeName,
          description: res.data.description,
        });
      });
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
      setError(null);
    }
  };
  //#endregion 
  //#region OnSubmit
  const onSave = async (values: IType) => {
    try {
      await axios.patch(apiRoutes.updateType(id), values);
      navigate("PanelAdmin/Types");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  //#endregion

  if (error) return error
  if (loading) return <LoadingText />;
  return (
    <>
      <Formik
        onSubmit={onSave}
        initialValues={initialValues}
        validationSchema={validType}
        enableReinitialize={true}
      >
        <Form>
          <div className="px-4 lg:px-20">
            <div className="structure-type">
              <h1 className="font-bold text-3xl"><span className="underline underline-offset-4">Edit</span> Type</h1>
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
                    name="typeName"
                    type="text"
                    className="input"
                    placeholder="Name(required)"
                  />
                  <ErrorMessage
                    name="typeName"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div>
                  <Field
                    name="description"
                    className="input"
                    type="text"
                    placeholder="Description(optional)"
                  />
                </div>
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

export default EditType