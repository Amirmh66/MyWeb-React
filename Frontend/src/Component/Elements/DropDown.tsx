import React from "react";
import { IDropDown } from "../../Types/Interfaces";
import { ChebronDown } from "./Icons";

const Dropdown = ({onChange , value}:IDropDown) => {
  return (
    <div  className="relative inline-block w-64">
      <select onChange={onChange} value={value} className="slc">
        <option>Categoryies</option>
        <option value="Feed">Feed</option>
        <option value="HardWare">HardWare</option>
        <option value="Book">Book</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <ChebronDown />
      </div>
    </div>
  );
};

export default Dropdown;
