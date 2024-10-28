import Button from "../../../../Elements/Buttons";
import { useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { useNavigate, useSubmit } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SuccessMes from "../../../../Elements/SuccessMes";
import * as yup from "yup";
import { Warning } from "../../../../Elements/Icons";

function AddCategory() {
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const onSave = async (values: any) => {
    try {
      await axios.post(api.createCategory, values);
      // setShowConfirm(true);
      navigate("/PanelAdmin/Categories");
    } catch (error: any) {
      setError(error.response.data);
    }
  };
  const initialValues = {
    name: "",
    description: "",
  };

  const validCategory = yup.object().shape({
    name: yup.string().max(45).required("Name is required"),
    description: yup.string().max(90).optional(),
  });

  const onCancle = () => {
    setShowConfirm(false);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSave}
        validationSchema={validCategory}
      >
        <Form autoComplete="off">
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <div className="structure">
              <h1 className="font-bold text-3xl">New Category</h1>
              <div className="structInp">
                {error && <p className="error"><Warning/>{error}</p>}
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="CategoryName(required)"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-500"
                    component="p"
                  />
                </div>
                <div>
                  <Field
                    name="description"
                    type="textarea"
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
      {showConfirm && (
        <SuccessMes
          onCancle={onCancle}
          message={"Create Category Successfully!"}
        />
      )}
    </>
  );
}
export default AddCategory;
