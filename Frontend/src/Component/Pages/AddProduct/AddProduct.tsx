import React, { SetStateAction, useState } from "react";
import "./AddProduct.css";
import { Button } from "../../Elements/Buttons";
import { IProduct } from "../../../Types/Interfaces";

 function AddProduct() {
  const [products, setProduct] = useState({
    Id: "",
    Name: "",
    Description: "",
    Price: 0,
    Stock: 0,
    Picture: "",
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { ...products, Id: generateId() };

    try {
      const response = await fetch("http://localhost:3000/Product", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to Add Product");
      }
      setProduct({
        Id: "",
        Name: "",
        Description: "",
        Price: 0,
        Stock: 0,
        Picture: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="lbl">
          <label htmlFor="name">
            Name :
            <input
              id="name"
              name="name"
              value={products.Name}
              onChange={handleChange}
              className="inp"
              type="text"
              required
            />
          </label>
        </div>
        {/* Description */}
        <div className="lbl">
          <label htmlFor="Description">
            Description:
            <input
              id="Description"
              value={products.Description}
              onChange={handleChange}
              className="inp des"
              type="text"
              required
            />
          </label>
        </div>
        {/* Stock */}
        <div className="lbl">
          <label htmlFor="Stock">
            Stock :
            <input
              id="Stock"
              className="inp"
              value={products.Stock}
              onChange={handleChange}
              type="number"
              required
            />
          </label>
        </div>
        {/* Price */}
        <div className="lbl">
          <label htmlFor="Price">
            Price :
            <input
              id="Price"
              className="inp"
              value={products.Price}
              onChange={handleChange}
              type="number"
              required
            />
          </label>
        </div>
        {/* Image */}
        <div className="lbl">
          <label className="m-12">
            Image: <input type="file"
             onChange={handleChange}
              value={products.Picture}
              required />
          </label>
        </div>
        <Button text="Submit" color="bg-green-600" />
      </form>
    </>
  );
}

export default AddProduct;
