import { memo } from 'react';
import PropTypes from 'prop-types';
// import './BlogSearch.css';

const BlogSearch = memo(function BlogSearch({ 
  searchTerm, 
  onSearch, 
  resultCount 
}) {
  return (
    <div className="blog-search">
      <div className="search-input-wrapper">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search posts..."
          className="search-input"
        />
        {searchTerm && (
          <span className="search-results-count">
            {resultCount} results found
          </span>
        )}
      </div>
    </div>
  );
});

BlogSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired
};

export default BlogSearch;