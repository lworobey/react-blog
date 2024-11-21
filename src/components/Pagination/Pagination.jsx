import { memo } from 'react';
import PropTypes from 'prop-types';
//import './Pagination.css';

const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  const pageNumbers = Array.from(
    { length: totalPages }, 
    (_, i) => i + 1
  );

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="page-numbers">
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`page-number ${
              number === currentPage ? 'active' : ''
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
});

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;