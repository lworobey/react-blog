import { useNavigate } from 'react-router-dom';
//import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  
  const categories = [
    'Technology',
    'Lifestyle',
    'Travel',
    'Food',
    'Programming'
  ];

  const recentPosts = [
    { id: 1, title: 'Getting Started with React' },
    { id: 2, title: 'Understanding React Router' },
    { id: 3, title: 'Mastering CSS Grid' }
  ];

  return (
    <aside className="sidebar">
      <section className="sidebar__section">
        <h3 className="sidebar__title">Categories</h3>
        <ul className="sidebar__list">
          {categories.map(category => (
            <li key={category} className="sidebar__item">
              <button 
                onClick={() => navigate(`/posts?category=${category.toLowerCase()}`)}
                className="sidebar__link"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="sidebar__section">
        <h3 className="sidebar__title">Recent Posts</h3>
        <ul className="sidebar__list">
          {recentPosts.map(post => (
            <li key={post.id} className="sidebar__item">
              <button
                onClick={() => navigate(`/posts/${post.id}`)}
                className="sidebar__link"
              >
                {post.title}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

export default Sidebar;