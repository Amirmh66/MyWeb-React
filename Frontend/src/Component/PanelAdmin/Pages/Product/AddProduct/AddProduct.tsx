import Button from "../../../../Elements/Buttons";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validProduct from "../../../../../Validations/ProductValidation";
import { useEffect, useState } from "react";
import { ICategories } from "../../../../../Types/Interfaces";
import SusscessMes from "../../../../Elements/SuccessMes";
import "../Product.css";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import QuillEditor from "../../../../Elements/QuillEditor";

function AddProduct() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  //#region GetCategories
  useEffect(() => {
    getCategories();
  });
  const getCategories = async () => {
    try {
      await axios.get(api.getCategories).then((res) => {
        setCategories(res.data);
      });
    } catch (error: any) {
      setError(error.response.data);
    }
  };
  //#endregion 
  //#region OnSubmit
  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      setIsSubmitting(true)
      const res = await axios.post(api.createProduct, values);
      if (res.status === 200) {
        setError(null);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
        resetForm();
      }
    } catch (error: any) {
      if (error.message === "Network Error") {
        setError("Server can't Response!")
      }
      else {
        setError(error.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  //#endregion

  const onCancle = () => {
    setShowSuccess(false);
  };

  const initialValues = {
    name: "",
    price: "",
    stock: "",
    description: "",
  };

  return (
    <>
      <div className="px-10">
        <div className="structure-product">
          <h1 className="font-bold uppercase text-3xl">
            <span className="underline underline-offset-4">New</span> Product
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validProduct}
          >
            <Form>
              <div className="structInp">
                {error && (
                  <div className="flex items-center gap-1 error">
                    <span className='w-5'>
                      <ExclamationTriangleIcon />
                    </span>
                    <p>
                      {error}
                    </p>
                  </div>
                )}
                <div>
                  <label htmlFor="Name">Name:</label>
                  <Field
                    id="Name"
                    name="name"
                    className="input"
                    placeholder="Product Name and Model"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-600"
                    component="p"
                  />
                </div>

                <div className="flex gap-5">
                  <div>
                    <label htmlFor="Price">Price:</label>
                    <Field
                      id="Price"
                      name="price"
                      type="number"
                      className="input"
                      placeholder="Price"
                    />
                    <ErrorMessage
                      name="price"
                      className="text-red-600"
                      component="p"
                    />
                  </div>
                  <div>
                    <label htmlFor="Stock">Stock:</label>
                    <Field
                      id="Stock"
                      name="stock"
                      type="number"
                      className="input"
                      placeholder="Stock"
                    />
                    <ErrorMessage
                      className="text-red-600"
                      component="p"
                      name="stock"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="Description">Description:</label>
                  <Field
                    id="textarea"
                    name="description"
                    placeholder="Description"
                    component={QuillEditor}
                  />
                  <ErrorMessage
                    name="description"
                    className="text-red-600"
                    component="p"
                  />
                </div>

                {/* DropPicture */}
                <div className="extraOutline p-4 bg-gray-100 dark:bg-gray-800 w-max bg-whtie m-auto rounded-lg">
                  <div
                    className="file_upload p-5 relative border-4 border-dotted border-gray-300 dark:border-gray-950 rounded-lg"
                    style={{ width: "380px" }}
                  >
                    <div className="input_field flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          multiple
                        />
                        <div
                          className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold
                             cursor-pointer p-1 px-3 hover:bg-indigo-500"
                        >
                          Select
                        </div>
                      </label>

                      <div className="title text-indigo-500 uppercase">
                        or drop files here
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  {/* <div>
                    <label htmlFor="Category">Category:</label>
                    <br />
                    <Field
                      id="Category"
                      name="category"
                      as="select"
                      className="DropDown"
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      className="text-red-600"
                      component="p"
                    />
                  </div> */}
                </div>
                <div>
                  <Button
                    disable={isSubmitting}
                    text={isSubmitting ? "Loading..." : "Create"}
                    className="bg-green-700 px-7"
                  />
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {showSuccess && (
        <SusscessMes
          onClose={onCancle}
          message="Product added successfully"
        />
      )}
    </>
  );
}
export default AddProduct;
