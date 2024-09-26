import { Dark, Light } from "../../Elements/Icons";
function Theme() {
  return (
    <>
      <div className="hidden lg:flex color-txt">
        {/* Button  */}
        <button
          type="button"
          className="hover:bg-gray-200 rounded-full p-2 dark:hover:bg-gray-800"
        >
          {/* dark  */}
          <div x-bind:className="darkMode ? 'hidden' : 'block' ">
            <Dark />
          </div>

          {/* Light  */}
          <div x-bind:className=" darkMode ? 'block' : 'hidden' ">
            <Light />
          </div>
        </button>
      </div>
    </>
  );
}

export default Theme;
