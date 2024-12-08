
interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: IPagination) {

  // const handlePrevious = () => {
  //   if (currentPage < totalPages) onPageChange(currentPage - 1);
  // }
  // const handleNext = () => {
  //   if (currentPage < totalPages) onPageChange(currentPage + 1)
  // }

  return (
    <div className="flex items-center justify-center my-5 ">
      <div>
        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <div>
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
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
