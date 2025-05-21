import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface IType {
  placeholderTxt: string
}

function SearchBox({ placeholderTxt }: IType) {
  return (
    <>
      <div className="relative flex items-center shadow-md rounded-full w-2/3">
        <span className="px-3 absolute">
          <MagnifyingGlassIcon className="h-6 w-6 text-indigo-500" />
        </span>
        <input
          type="search"
          id="searchBox"
          placeholder={placeholderTxt}
        />
      </div>
    </>
  );
}

export default SearchBox;
