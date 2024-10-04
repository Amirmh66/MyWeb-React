import React from "react";
import { Search } from "../../../Elements/Icons";

function SearchBox() {
  return (
    <>
      <div className="basis-2/5 mx-7 lg:mx-8 relative flex items-center drop-shadow">
        <span className="p-2 absolute">
          <Search />
        </span>
        <input type="text" className="SearchBox" placeholder="Search here..." />
      </div>
    </>
  );
}

export default SearchBox;
