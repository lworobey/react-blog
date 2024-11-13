import styles from './BlogPost.module.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import CommentSection from '../CommentSection/CommentSection';
import { calculateReadTime } from '../../utils/readTime';


function BlogPost({id, title, content, author, date}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    setReadTime(calculateReadTime(content));
  }, [content]);

  const toggleContent = () => {
    setIsExpanded(prev => !prev);
  };

  const displayContent = isExpanded 
    ? content 
    : content.slice(0, 200) + (content.length > 200 ? '...' : '');

  return (
    <article className={styles.blogPost}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <span className={styles.author}>By {author}</span>
          <time className={styles.date}>{date}</time>
          <span className={styles.readTime}>{readTime} min read</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <p>{displayContent}</p>
        {content.length > 200 && (
          <button 
            onClick={toggleContent}
            className={styles.expand}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      <div className={styles.actions}>
        <LikeButton initialLikes={0} />
        <CommentSection postId={id} />
      </div>
    </article>
  );
}


BlogPost.propTypes = {

    title: PropTypes.string.required,
    content: PropTypes.string.required,
    author: PropTypes.string.required,
    date: PropTypes.string.required,
    readTime: PropTypes.number.required
};

export default BlogPost;    