function Header() {
    return (
      <header className="blog-header">
        
        <h1>My Awesome Blog</h1>
        <button 
          onClick={() => document.body.toggle('dark-mode')}
          className="theme-toggle"
        >
          Toggle Theme
        </button>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;