import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageNumber, totalCount, changePage }) => {
  return (
    <div className="flex items-center justify-center mt-16">
      <ReactPaginate
        forcePage={pageNumber}
        pageCount={Math.ceil(totalCount / 6)}
        onPageChange={changePage}
        containerClassName="flex justify-center paginationBttns items-center text-white"
        pageClassName="px-2 m-6"
        previousLinkClassName="previousBttn"
        nextLinkClassName="nextBttn"
        disabledClassName="paginationDisabled"
        activeClassName="bg-white text-black rounded-full"
        previousLabel={pageNumber === 0 ? null : "Previous"}
        nextLabel={pageNumber === Math.ceil(totalCount / 6) - 1 ? null : "Next"}
      />
    </div>
  );
};

export default Pagination;
