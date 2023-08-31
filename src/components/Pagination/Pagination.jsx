import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Görünen sayfa düğmeleri sayısı

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage;
    let endPage;
    const middlePage =parseInt(Math.ceil(totalPages / 2));

    if (currentPage <= middlePage) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage + middlePage - 1 >= totalPages) {
      startPage = totalPages - totalPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - middlePage + 1;
      endPage = currentPage + middlePage - 1;
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
        {getPageNumbers().map((number,index) => (
          <li key={index} className="page-item">
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
