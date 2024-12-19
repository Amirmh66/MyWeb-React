import { useEffect, useState } from "react";
import "../Product.css";
import Button from "../../../../Elements/Buttons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import validateSchima from "../../../../../Validations/ProductValidation";
import SusscessMes from "../../../../Elements/SuccessMes";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { ICategories } from "../../../../../Types/Interfaces";
import LoadingText from "../../../../Elements/LoadingText";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    category: "",
  });


  //#region GetCategories
  useEffect(() => {
    getCategories();
  }, []);
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
  //#region GetProduct
  useEffect(() => {
    getProduct();
  }, [id]);
  const getProduct = async () => {
    try {
      await axios.get(api.getProductById(id)).then((res) => {
        const data = res.data;
        setInitialValues({
          name: data.name,
          price: data.price,
          stock: data.stock,
          description: data.description,
          category: data.category,
        });
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  //#endregion
  //#region UpdateProduct
  const updateProduct = async (values: any) => {
    try {
      setIsSubmitting(true)
      await axios.patch(api.updateProduct(id), values).then((res) => {
        if (res.status === 200) {
          setShowSuccess(true);
          navigate("/PanelAdmin/Product");
        }
      });
    } catch (error: any) {
      setError(error.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };
  //#endregion 

  const onCancle = () => {
    setShowSuccess(false);
  };

  if (loading) return <LoadingText />;

  return (
    <>
      <div className="px-14">
        <div className="structure-product">
          <h1 className="font-bold uppercase text-3xl">
            <span className="underline underline-offset-4">Edit</span> Product
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
          <Formik
            initialValues={initialValues}
            onSubmit={updateProduct}
            validationSchema={validateSchima}
            enableReinitialize={true}
          >
            <Form>
              <div className="structInp">
                <div>
                  <label htmlFor="Name">Name:</label>
                  <Field
                    id="Name"
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Product Name and Model"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-600"
                    component="p"
                  />
                </div>
                <div className="flex gap-3">
                  <div>
                    <label htmlFor="Price">Price:</label>
                    <Field
                      id="Price"
                      name="price"
                      className="input"
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
                      className="input"
                    />
                    <ErrorMessage
                      className="text-red-600"
                      component="p"
                      name="stock"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="textarea">Description:</label>
                  <Field
                    id="textarea"
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
                <div className="extraOutline p-4 bg-gray-100 dark:bg-gray-800 w-max bg-whtie rounded-lg m-auto">
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
                  text={isSubmitting ? "Loading..." : "Edit"}
                  className="bg-blue-600 px-7"
                  disable={isSubmitting}
                />
              </div>
            </Form>
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
