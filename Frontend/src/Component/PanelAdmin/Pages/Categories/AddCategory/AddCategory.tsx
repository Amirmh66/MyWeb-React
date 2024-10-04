import { Button } from "../../../../Elements/Buttons";
import { useState } from "react";
import axios from "axios";
import api from "../../../../../Constants/apiRoutes";
import { useSubmit } from "react-router-dom";

function AddCategory() {
  const [categories, setCategories] = useState({
    Name: "",
    Description: "",
  });

  const onSave = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post(api.createCategory, categories, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCategories({ ...categories, [name]: value });
  };
  return (
    <>
      <form onSubmit={onSave}>
        <div className="container mx-auto my-4 px-4 lg:px-20">
          <div className="structure">
            <div className="flex">
              <h1 className="font-bold text-3xl">New Category</h1>
            </div>
            {/* Inputs */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-1 2xl:grid-cols-2 mt-5">
              {/* UserName */}
              <input
                name="Name"
                className="inp"
                type="text"
                value={categories.Name}
                onChange={handleInputChange}
                placeholder="Name(required)"
                required
                maxLength={30}
              />
              <input
                className="inp"
                name="Description"
                type="text"
                value={categories.Description}
                onChange={handleInputChange}
                placeholder="Description(optional)"
                maxLength={100}
              />
            </div>
            <div className="my-4 w-1/2 lg:w-1/4">
              <Button onClick={useSubmit} text="Create" color="bg-green-700" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default AddCategory;
