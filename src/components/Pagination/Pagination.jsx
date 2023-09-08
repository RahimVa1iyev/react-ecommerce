import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Number of visible page numbers
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage;
    let endPage;

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all pages
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfVisiblePages) {
      // If current page is near the beginning, show the first maxVisiblePages pages
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - halfVisiblePages) {
      // If current page is near the end, show the last maxVisiblePages pages
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      // Otherwise, center the current page and show halfVisiblePages on each side
      startPage = currentPage - halfVisiblePages;
      endPage = currentPage + halfVisiblePages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="shop-pagination">
        <li>
          <button
            className="shop-page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {getPageNumbers().map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => handlePageChange(number)}
              className={`shop-page-link ${number === currentPage ? 'active' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className="shop-page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
