import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function SearchBox() {
  return (
    <>
      <div className="basis-4/5 ml-8 2xl:mx-8 relative flex items-center shadow-md rounded-full">
        <span className="px-3 absolute">
          <MagnifyingGlassIcon className="h-6 w-6 text-indigo-500"/>
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
