import { useState } from 'react';
import PropTypes from 'prop-types';
//import './TagInput.css';

function TagInput({ tags, onChange, onBlur, error }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = inputValue.trim();//removed toLowerCase
      
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="form-group">
      <label>Tags *</label>
      <div className={`tag-input ${error ? 'error' : ''}`}>
        <div className="tag-list">
          {tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="tag-remove"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          placeholder="Type and press Enter to add tags"
        />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TagInput;