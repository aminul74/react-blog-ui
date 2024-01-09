const Pagination = ({ handleNextClick, handlePrevClick, currentPage }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={handlePrevClick}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:scale-105 duration-200"
          >
            <svg
              className="w-3.5 h-3.5 ms-2 rotate-180 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={handleNextClick}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:scale-105 duration-200"
          >
            Next
            <svg
              className="w-3.5 h-3.5 me-2 rotate-180 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
