import { useEffect, useState } from "react";
import "../Product.css";
import Button from "../../../../Elements/Buttons";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import validateSchima from "../../../../../Validations/ProductValidation";
import SusscessMes from "../../../../Elements/SuccessMes";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { ICategories } from "../../../../../Types/Interfaces";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    price: 0,
    stock: 0,
    summary: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      try {
        const response = await axios.get(api.getCategories);
        setCategories(response.data);
      } catch ({ error }: any) {
        setError(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);
  const getProduct = async () => {
    try {
      const response = await axios.get(api.getProductById(id));
      const data = await response.data;

      setInitialValues({
        name: data.name,
        price: data.price,
        stock: data.stock,
        summary: data.summary,
        description: data.description,
        category: data.category,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (values: any) => {
    try {
      await axios.patch(api.updateProduct(id), values, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(values);
      setShowSuccess(true);
      navigate("/PanelAdmin/Product");
    } catch (error) {
      console.log(error, "Error While Update Product");
    }
  };

  const onCancle = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="structure">
          <h1 className="font-bold uppercase text-3xl">New Product</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={updateProduct}
            validationSchema={validateSchima}
            enableReinitialize={true}
          >
            {(isSubmitting) => (
              <Form>
                <div className="structInp">
                  <div>
                    <label htmlFor="Name">Name:</label>
                    <Field
                      id="Name"
                      name="name"
                      type="text"
                      placeholder="ProductName"
                    />
                    <ErrorMessage
                      name="name"
                      className="text-red-600"
                      component="p"
                    />
                  </div>
                  <div>
                    <label htmlFor="Price">Price:</label>
                    <Field
                      id="Price"
                      name="price"
                      type="number"
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
                      placeholder="Stock"
                    />
                    <ErrorMessage
                      className="text-red-600"
                      component="p"
                      name="stock"
                    />
                  </div>
                  <div>
                    <label htmlFor="Summary">Summary:</label>
                    <Field
                      id="Summary"
                      name="summary"
                      type="text"
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
                      id="Description"
                      name="description"
                      type="textarea"
                      rows="3"
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
                  <div className="w-full h-full flex bg-black bg-opacity-60 ">
                    <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                      <div
                        className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                        style={{ width: "380px" }}
                      >
                        <div className="input_field flex flex-col w-max mx-auto text-center">
                          <label>
                            <input
                              className="text-sm cursor-pointer w-36 hidden"
                              type="file"
                              multiple
                            />
                            <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                              Select
                            </div>
                          </label>

                          <div className="title text-indigo-500 uppercase">
                            or drop files here
                          </div>
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
                          <option value={category.name} key={category._id}>
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

                  <Button
                    text="Submit"
                    className="bg-green-700"
                    onClick={useSubmit}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {showSuccess && (
        <SusscessMes onCancle={onCancle} message="Edit Product Successfully!" />
      )}
    </>
  );
}

export default EditProduct;
