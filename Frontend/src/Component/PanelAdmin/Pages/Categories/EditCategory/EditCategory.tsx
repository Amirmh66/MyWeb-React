import { useNavigate, useParams, useSubmit } from "react-router-dom";
import Button from "../../../../Elements/Buttons";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import * as yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

function EditCategory() {
  const [initialValues, setinitialValues] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategory();
  }, [id]);
  const getCategory = async () => {
    try {
      const response = await axios.get(api.getCategoryById(id));
      const data = await response.data;
      setinitialValues({
        name: data.name,
        description: data.description,
      });
    } catch ({ error }: any) {
      setError(error);
    }
  };

  const onSave = async (values: any) => {
    try {
      await axios.patch(api.updateCategory(id), values);
      navigate("/PanelAdmin/Categories");
    } catch ({ error }: any) {
      setError(error);
    }
  };
  const validCategory = yup.object().shape({
    name: yup.string().max(45).required("Name is required"),
    description: yup.string().max(90).optional(),
  });
  return (
    <>
      <Formik
        onSubmit={onSave}
        initialValues={initialValues}
        validationSchema={validCategory}
        enableReinitialize={true}
      >
        <Form>
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <div className="structure">
              <h1 className="font-bold text-3xl">Edit Category</h1>
              <div className="structInp">
                <div>
                  <Field name="name" type="text" placeholder="Name(required)" />
                  <ErrorMessage
                    name="name"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div>
                  <Field
                    name="description"
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
