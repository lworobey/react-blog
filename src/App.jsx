import Header from "./components/Header";
import BlogList from "./components/BlogList/BlogList";
import { posts as initialPosts } from "./data/posts";
import PostEditor from "./components/PostEditor/PostEditor";
import { useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(initialPosts);

  function handlePosts(newPost) {
    newPost.id = posts.length + 1;
    setPosts([...posts, newPost]);
  }
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <BlogList posts={posts} />
        <PostEditor publishPosts={handlePosts} />
      </main>
    </div>
  );
}

export default App;
