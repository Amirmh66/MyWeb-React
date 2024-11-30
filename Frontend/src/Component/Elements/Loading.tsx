export function LoadingText() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div
          className="flex justify-center items-center space-x-1 text-lg 
        text-gray-700 dark:text-gray-300"
        >

          <div>Loading ...</div>
        </div>
      </div>
    </>
  );
}
export function LoadingSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-5 mx-10">
        <div className="relative p-1 w-full bg-white overflow-hidden rounded-lg">
          <div className="animate-pulse flex flex-col">
            <div className="rounded w-full h-52 bg-gray-200"></div>
            <div className="flex flex-col mt-5">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
              <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="relative p-1 w-full bg-white overflow-hidden rounded-lg">
          <div className="animate-pulse flex flex-col">
            <div className="rounded w-full h-52 bg-gray-200"></div>
            <div className="flex flex-col mt-5">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
              <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="relative p-1 w-full bg-white overflow-hidden rounded-lg">
          <div className="animate-pulse flex flex-col">
            <div className="rounded w-full h-52 bg-gray-200"></div>
            <div className="flex flex-col mt-5">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
              <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="relative p-1 w-full bg-white overflow-hidden rounded-lg">
          <div className="animate-pulse flex flex-col">
            <div className="rounded w-full h-52 bg-gray-200"></div>
            <div className="flex flex-col mt-5">
              <div className="w-full h-5 bg-gray-200 rounded"></div>
              <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
              <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
