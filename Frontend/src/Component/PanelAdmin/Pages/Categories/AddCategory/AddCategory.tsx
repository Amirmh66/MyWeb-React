import Button from "../../../../Elements/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { useNavigate, useSubmit } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Notification from "../../../../Elements/Notification";
import "../Categoryies.css";
import validCategory from "../../../../../Validations/ValidCategoryies";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import apiRoutes from "../../../../../Constants/apiRoutes";

interface ICategory {
  name: string;
  description: string;
  types: string[];
}

interface ITypes {
  _id: string;
  typeName: string;
}
function AddCategory() {
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [types, setTypes] = useState<ITypes[]>([]);
  const [isSendRequest, setIsSendRequest] = useState(true);

  //#region GetTypes
  useEffect(() => {
    if (isSendRequest) {
      GetTypes();
    }
  }, [isSendRequest]);
  const GetTypes = async () => {
    try {
      await axios.get(apiRoutes.getTypes).then((res) => {
        setTypes(res.data);
      })
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setIsSendRequest(false);
    }
  }
  //#endregion 
  //#region OnSubmit
  const onSave = async (values: ICategory) => {
    try {
      await axios.post(api.createCategory, values);
      navigate("/PanelAdmin/Categories");
    } catch (error: any) {
      setError(error.response.data);
    }
  };
  //#endregion 

  const initialValues = {
    name: "",
    description: "",
    types: [],
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSave}
        validationSchema={validCategory}
      >
        <Form>
          <div className="px-10">
            <div className="structure-category">
              <h1 className="font-bold text-3xl"><span className="underline underline-offset-4">New</span> Category</h1>
              <div className="structInp-category">
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
                  <label htmlFor="CategoryName">CategoryName:</label>
                  <Field
                    id="CategoryName"
                    name="name"
                    type="text"
                    className="input"
                    placeholder="CategoryName(required)"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-500"
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
                  <label htmlFor="textarea">Description:</label>
                  <Field
                    name="description"
                    type="textarea"
                    id="textarea"
                    as="textarea"
                    placeholder="Description(optional)"
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
      <Notification
        title={"Create Category Successfully!"} show={showConfirm}
      />
    </>
  );
}
export default AddCategory;
