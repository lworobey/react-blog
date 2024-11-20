import Header from './components/Header';
import BlogList from './components/BlogList/BlogList';
import { posts } from './data/posts';
import PostEditor from './components/PostEditor/PostEditor';
import './App.css';
import RichTextEditor from './components/RichTextEditor/RichTextEditor';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <BlogList posts={posts} />
        <PostEditor />
        <RichTextEditor />
      </main>
    </div>
  );
}

export default App;