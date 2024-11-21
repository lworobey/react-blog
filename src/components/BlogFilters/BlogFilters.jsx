import { memo } from 'react';
import PropTypes from 'prop-types';
import './BlogFilters.css';

const BlogFilters = memo(function BlogFilters({
  filters,
  onFilterChange,
  categories,
  authors,
  allTags
}) {
  return (
    <div className="blog-filters">
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          {categories.length && categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="author">Author</label>
        <select
          id="author"
          value={filters.author}
          onChange={(e) => onFilterChange('author', e.target.value)}
        >
          {authors.map(author => (
            <option key={author} value={author}>
              {author === 'all' ? 'All Authors' : author}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Tags</label>
        <div className="tags-filter">
          {allTags.map(tag => (
            <label key={tag} className="tag-checkbox">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={(e) => {
                  const newTags = e.target.checked
                    ? [...filters.tags, tag]
                    : filters.tags.filter(t => t !== tag);
                  onFilterChange('tags', newTags);
                }}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
});

BlogFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  allTags: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default BlogFilters;