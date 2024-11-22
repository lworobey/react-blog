import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import '../../styles/layout.css';

function Layout() {
  return (
    <div className="layout">
      <Navigation />
      
      <div className="layout__content">
        <main className="layout__main">
          <Outlet />
        </main>
        
        <Sidebar className="layout__sidebar" />
      </div>
      
      <Footer />
    </div>
  );
}

export default Layout;