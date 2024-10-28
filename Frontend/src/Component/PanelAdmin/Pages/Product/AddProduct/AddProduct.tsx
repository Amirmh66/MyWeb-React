import Button from "../../../../Elements/Buttons";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validProduct from "../../../../../Validations/ProductValidation";
import { useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICategories } from "../../../../../Types/Interfaces";
import SusscessMes from "../../../../Elements/SuccessMes";
import { Warning } from "../../../../Elements/Icons";
import "../Product.css";

function AddProduct() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getCategories();
  });

  const getCategories = async () => {
    try {
      const response = await axios.get(api.getCategories);
      const data = response.data;
      setCategories(data);
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      await axios.post(api.createProduct, values);
      setShowSuccess(true);
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  const onCancle = () => {
    setShowSuccess(false);
  };
  const initialValues = {
    name: "",
    price: "",
    stock: "",
    summary: "",
    description: "",
    category: "",
  };
  return (
    <>
      <div className="px-10">
        <div className="structure-product">
          <h1 className="font-bold uppercase text-3xl">New Product</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validProduct}
          >
            <Form>
              <div className="structInp">
                {error && (
                  <p className="error">
                    <Warning />
                    {error}
                  </p>
                )}
                <div>
                  <label htmlFor="Name">Name:</label>
                  <Field
                    id="Name"
                    name="name"
                    className="input"
                    placeholder="ProductName"
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
                  <label htmlFor="Summary">Summary:</label>
                  <Field
                    id="Summary"
                    name="summary"
                    type="text"
                    className="input"
                    placeholder="Summary"
                  />
                  <ErrorMessage
                    name="summary"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div>
                  <label htmlFor="Description">Description:</label>
                  <Field
                    id="textarea"
                    name="description"
                    rows="6"
                    as="textarea"
                    placeholder="Description"
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
                  <div>
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
                  </div>
                </div>
                <div>
                  <Button
                    text="Submit"
                    className="bg-green-700"
                    onClick={useSubmit}
                  />
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {showSuccess && (
        <SusscessMes
          onCancle={onCancle}
          message="Create Product Successfully!"
        />
      )}
    </>
  );
}
export default AddProduct;
