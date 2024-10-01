import { useEffect, useState } from "react";
import "../Product.css";
import { Button } from "../../../Elements/Buttons";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import axios from "axios";
import DropDown from "../../../Elements/DropDown";
import api from '../../../../Constants/apiRoutes'
function EditProduct() {
  const [products, setProducts] = useState({
    Name: "",
    Description: "",
    Stock: "",
    Price: "",
    Category: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const res = await axios.get(api.getProducts);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  };

  const updateProduct = async (e: any) => {
    e.preventDefault();
    try {
      await axios.patch(api.updateProduct(id), products, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/Product");
    } catch (error) {
      console.log(error, "Error While Update Product");
    }
  };

  return (
    <>
      <form onSubmit={updateProduct}>
        <div className="container mx-auto my-4 px-4 lg:px-20">
          <div className="structure">
            <div className="flex">
              <h1 className="font-bold uppercase text-3xl">Edit Product</h1>
            </div>
            {/* Inputs */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              {/* Name */}
              <input
                name="Name"
                value={products.Name}
                onChange={handleInputChange}
                className="inp"
                type="text"
                placeholder="Name"
              />
              {/* Price */}
              <input
                className="inp"
                name="Price"
                value={products.Price}
                onChange={handleInputChange}
                type="number"
                placeholder="Price"
              />
              {/* Stock */}
              <input
                name="Stock"
                className="inp"
                value={products.Stock}
                onChange={handleInputChange}
                type="number"
                placeholder="Stock"
              />
            </div>
            {/* Textarea */}
            <div className="my-4">
              <textarea
                name="Description"
                value={products.Description}
                onChange={handleInputChange}
                placeholder="Description"
                className="txterea"
              ></textarea>
            </div>
            {/* Image */}
            <div className="lbl">
              <input type="file" name="File" onChange={handleInputChange} />
            </div>
            <DropDown onChange={handleInputChange} value={products.Category} />

            <div className="my-2 w-1/2 lg:w-1/4">
              <Button onClick={useSubmit} text="Edit" color="bg-green-700" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditProduct;
