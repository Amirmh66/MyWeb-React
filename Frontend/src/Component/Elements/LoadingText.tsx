function LoadingText() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="flex justify-center items-center space-x-1 text-lg 
        text-gray-700 dark:text-gray-300 select-none"
        >
          <div className="flex justify-between items-center">
            <span className="animate-spin text-2xl">
              🌀
            </span>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoadingText;