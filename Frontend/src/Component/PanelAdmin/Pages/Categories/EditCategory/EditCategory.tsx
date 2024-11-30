import { useNavigate, useParams, useSubmit } from "react-router-dom";
import Button from "../../../../Elements/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../Categoryies.css";
import { validCategory } from "../../../../../Validations/ValidCategoryies";
import { LoadingText } from "../../../../Elements/Loading";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import apiRoutes from "../../../../../Constants/apiRoutes";

interface ITypes {
  _id: string;
  typeName: string;
}

function EditCategory() {
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState<ITypes[]>([]);
  const [initialValues, setinitialValues] = useState({
    name: "",
    description: "",
    types: [],
  });

  //#region GetCategory
  useEffect(() => {
    getCategory();
    getTypes();
  }, [id]);
  const getCategory = async () => {
    try {
      await axios.get(api.getCategoryById(id)).then((res) => {
        setinitialValues({
          name: res.data.name,
          description: res.data.description,
          types: res.data.types,
        });
      });
    } catch (error: any) {
      setError(error.response.data);
    } finally {
      setLoading(false);
      setError(null);
    }
  };
  //#endregion
  //#region OnSubmit
  const onSave = async (values: any) => {
    try {
      await axios.patch(apiRoutes.updateCategory(id), values).then(() => {
        navigate("/PanelAdmin/Categories");
      })
    } catch (error: any) {
      setError(error.response.data);
    }
  };
  //#endregion
  //#region GetTypes
  const getTypes = async () => {
    try {
      await axios.get(apiRoutes.getTypes).then((res) => {
        const types = res.data;
        setTypes(types);
      })
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }
  //#endregion
  if (loading) return <LoadingText />;
  return (
    <>
      <Formik
        onSubmit={onSave}
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validCategory}
      >
        <Form>
          <div className="px-4 lg:px-20">
            <div className="structure-category">
              <h1 className="font-bold text-3xl"><span className="underline underline-offset-4">Edit</span> Category</h1>
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
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Name(required)"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div>
                  <label>Types</label>
                  <div className="overflow-auto" style={{ maxHeight: "250px" }}>
                    {types.map((t) => (
                      <div key={t._id} className="flex gap-2 border p-2 rounded-lg my-1" >
                        <Field type="checkbox" name="types" value={t._id} />
                        <label htmlFor={t._id}>{t.typeName}</label>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage
                    name="types"
                    className="text-red-500"
                    component="p" />
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
export default EditCategory;
