import { Search } from "../../../Elements/Icons";

function SearchBox() {
  return (
    <>
      <div className="relative flex items-center shadow-md">
        <span className="px-1 absolute">
          <Search />
        </span>
        <input
          type="search"
          id="searchBox"
          placeholder="Search here..."
        />
      </div>
    </>
  );
}

export default SearchBox;
