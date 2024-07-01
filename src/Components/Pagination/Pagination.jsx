import React, { useState, useEffect } from "react";

const Pagination = ({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // Calculate total pages based on totalItems and itemsPerPage
    const pagesCount = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pagesCount);

    // Generate array of pages dynamically
    setPages(Array.from(Array(pagesCount).keys()));
  }, [totalItems, itemsPerPage]);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page + 1)}
          className={currentPage === page + 1 ? "active" : ""}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
