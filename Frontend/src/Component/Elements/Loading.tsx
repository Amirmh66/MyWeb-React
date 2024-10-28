import { LoadingIcon } from "./Icons";

function Loading() {
  return (
    <>
      <div className="flex items-center pt-24 justify-center w-full h-full">
        <div
          className="flex justify-center items-center space-x-1 text-lg 
        text-gray-700 dark:text-gray-300"
        >
          <LoadingIcon />
          <div>Loading ...</div>
        </div>
      </div>
    </>
  );
}

export default Loading;
