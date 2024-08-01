// import React, { useState, useEffect } from "react";

// const Pagination = ({
//   currentPage,
//   onPageChange,
//   totalItems,
//   itemsPerPage,
// }) => {
//   const [totalPages, setTotalPages] = useState(1);
//   const [pages, setPages] = useState([]);

//   useEffect(() => {
//     // Calculate total pages based on totalItems and itemsPerPage
//     const pagesCount = Math.ceil(totalItems / itemsPerPage);
//     setTotalPages(pagesCount);

//     // Generate array of pages dynamically
//     setPages(Array.from(Array(pagesCount).keys()));
//   }, [totalItems, itemsPerPage]);

//   const handlePageClick = (pageNumber) => {
//     onPageChange(pageNumber);
//   };

//   return (
//     <div className="pagination">
//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => handlePageClick(page + 1)}
//           className={currentPage === page + 1 ? "active-page" : ""}
//         >
//           {page + 1}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;

import React, { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalItems, onPageChange, itemsPerPage }) => {
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    // Calculate total pages based on totalItems and itemsPerPage
    const pagesCount = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pagesCount);
  }, [totalItems, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const range = 1; // Number of pages to show around the current page

    if (totalPages <= 5) {
      // Less than or equal to 5 pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // More than 5 pages, use ellipses
      if (currentPage <= 3) {
        // Show first few pages and the last page
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last few pages and the first page
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show a range around the current page
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - range; i <= currentPage + range; i++) {
          if (i > 0 && i <= totalPages) {
            pageNumbers.push(i);
          }
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    // Remove duplicate ellipses
    return pageNumbers.filter((item, index, arr) => item !== '...' || (index > 0 && arr[index - 1] !== '...'));
  };

  const pageNumbers = getPageNumbers();


  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
      >
        &lt;
      </button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => {
            if (number !== "...") {
              handlePageChange(number);
            }
          }}
          className={number === currentPage ? "active-page" : ""}
          disabled={number === "..."}
          aria-current={number === currentPage ? "page" : undefined}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
};


export default Pagination;
