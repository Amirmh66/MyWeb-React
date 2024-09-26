import React, { useState } from "react";
import { ChebronDown } from "../../Elements/Icons";

function Language() {
  return (
    <>
      <div className="Lang">
        <img
          srcSet="/Images/usaflag.jpeg"
          className="size-6 rounded-full"
          alt="usaflag"
        />
        <span className="pl-2 font-bold">Eng (US)</span>
        <ChebronDown />
      </div>
    </>
  );
}

export default Language;
