/**
 * Layout Component
 * 
 * Main application layout wrapper that provides consistent structure across pages.
 * Renders the Header component and uses React Router's Outlet for page content.
 * 
 * Features:
 *   - Persistent header across all pages
 *   - Main content area that changes based on route
 *   - Uses React Router's Outlet for nested route rendering
 * 
 * @module components/Layout
 */

import Header from "./header/Header";
import { Outlet } from 'react-router-dom';

/**
 * Layout Component
 * Wraps application pages with consistent header and main content structure.
 * 
 * @returns {JSX.Element} Rendered layout with header and dynamic content area
 */
const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
