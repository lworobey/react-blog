import { useState, useEffect } from 'react';
import './PostEditor.css';
import TagInput from '../TagInput/TagInput';
import useUnsavedChanges from '../../hooks/useUnsavedChanges';
import ReactMarkdown from 'react-markdown';
import RichTextEditor from '../RichTextEditor/RichTextEditor';

function PostEditor() {
  // Initial form data from localStorage (for draft persistence)
  const initialFormData = JSON.parse(localStorage.getItem('formData')) || {
    title: '',
    content: '',
    tags: [],
    category: 'general',
    isPublished: false,
    image: null
  };

  const [publishedPosts, setPublishedPosts] = useState([]); // No persistence for published posts
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false); // Track if the form is dirty

  // Using the hook to monitor unsaved changes
  useUnsavedChanges(isDirty);

  // Validate Fields
  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return value.trim().length < 1 ? 'Title must be at least 1 character' : '';
      case 'content':
        return value.trim().length < 5 ? 'Content must be at least 5 characters' : '';
      case 'tags':
        return value.length === 0 ? 'At least one tag is required' : '';
      default:
        return '';
    }
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    
    
    setIsDirty(true); // Mark as dirty when user makes changes
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result 
        }));
      };
      reader.readAsDataURL(file); 
    }
  };
 
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();

   
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (formData.isPublished) {
       
        console.log('Form Published:', formData);

       
        setPublishedPosts((prevPosts) => [...prevPosts, formData]);

       
        setFormData({
          title: '',
          content: '',
          tags: [],
          category: 'general',
          isPublished: false,
          image: null
        });
        localStorage.removeItem('formData');
        setIsDirty(false); 
      } else {
      
        console.log('Draft Saved!');
        localStorage.setItem('formData', JSON.stringify(formData));
        setIsDirty(false); 
      }
    }
  };

 
  const renderPublishedPosts = () => {
    if (publishedPosts.length === 0) {
      return <p>No posts published yet.</p>;
    }
    return publishedPosts.map((post, index) => (
      <div key={index} className="post-preview">
        <h3>{post.title}</h3>
        {post.image && (
          <div>
            <img src={post.image} alt="Post Preview" className="image-preview" />
          </div>
        )}
        <ReactMarkdown>{post.content}</ReactMarkdown>
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
      </div>
    ));
  };

  return (
    <div className="post-editor-container">
      {/* Post Editor Form */}
      <form onSubmit={handleSubmit} className="post-editor">
        <div className="form-group">
          <label htmlFor="image">Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {formData.image && (
            <img 
              src={formData.image} 
              alt="Preview" 
              className="image-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <RichTextEditor
            value={formData.content}
            onChange={(content) => handleChange({ target: { name: "content", value: content } })}
            error={errors.content}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        {/* Tag Input */}
        <TagInput
          tags={formData.tags}
          onChange={(tags) => handleChange({ target: { name: 'tags', value: tags } })}
          onBlur={() => handleBlur({ target: { name: 'tags', value: formData.tags } })}
          error={errors.tags}
        />

        {/* Category Select */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        {/* Publish Checkbox */}
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            Publish immediately
          </label>
        </div>


        {/* Submit Button */}
        <button type="submit" className="submit-button">
          {formData.isPublished ? 'Publish Post' : 'Save Draft'}
        </button>
      </form>

      {/* Live Preview */}
      <div className="live-preview">
        <h3>Live Preview</h3>
        <h2>{formData.title}</h2>
        {formData.image && (
          <div>
            <img src={formData.image} alt="Post Preview" className="image-preview" />
          </div>
        )}
        <div>
          <ReactMarkdown>{formData.content}</ReactMarkdown>
        </div>
        <div>
          <p>Tags: {formData.tags.join(', ')}</p>
        </div>
        <div>
          <p>Category: {formData.category}</p>
        </div>
      </div>

      {/* Published Posts */}
      <div className="published-posts">
        <h2>Published Posts</h2>
        {renderPublishedPosts()}
      </div>
    </div>
  );
}

export default PostEditor;