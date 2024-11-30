
interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: IPagination) {

  const handlePrevious = () => {
    if (currentPage < totalPages) onPageChange(currentPage - 1);
  }
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className="flex items-center justify-center my-5 ">

      {/* <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentPage}</span> to
            <span className="font-medium">{totalPages}</span> results
          </p>
        </div> */}

      <div>
        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">

          {/* <button
            disabled={currentPage === 1} onClick={handlePrevious}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 dark:text-gray-700 ring-1
               ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0">
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon aria-hidden="true" className="size-5 dark:text-gray-950 text-gray-500" />
          </button> */}

          <div className=' '>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  aria-current="page"
                  key={index + 1}
                  onClick={() => onPageChange(index + 1)}
                  style={{ borderColor: currentPage === page ? "blue" : "gray" }}
                  className="relative z-10 inline-flex items-center px-4  border-b-4 rounded-sm mx-1 font-semibold
                focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-indigo-600 dark:text-gray-100 text-gray-800">{index + 1}</button>
              )
            })}</div>

          {/* <button
            disabled={currentPage === totalPages} onClick={handleNext}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 dark:text-gray-700 ring-1
               ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0">
            <span className="sr-only" >Next</span>
            <ChevronRightIcon aria-hidden="true" className="size-5 dark:text-gray-950 text-gray-500" />
          </button> */}

        </nav>
      </div>
    </div>
  )
}
