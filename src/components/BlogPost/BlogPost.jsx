import styles from './BlogPost.module.css';
import PropTypes from 'prop-types';
function BlogPost({ title, content, author, date, readTime }) {
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
        {content}
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