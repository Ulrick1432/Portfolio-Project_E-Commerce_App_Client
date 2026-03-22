/**
 * Header Component
 * 
 * Main navigation header that displays throughout the application.
 * Shows authentication status and provides navigation to key pages.
 * 
 * Features:
 *   - App branding/name with link to homepage
 *   - Cart access button
 *   - Conditional rendering based on authentication state
 *   - User menu (Orders/Logout) for logged-in users
 *   - Guest menu (Login/Create Account) for anonymous users
 * 
 * @module components/Header
 */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../api/userAuth";
import { getCartInSession } from "../../api/cart";
import { getUser } from "../../api/userAuth";
import './header.css';

/**
 * Header component - displays top navigation bar.
 * Fetches user authentication status on location change to keep state current.
 * 
 * @returns {JSX.Element} Rendered header with conditional auth buttons
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(false);

  /**
   * Fetches current user authentication status when component mounts
   * or when location changes (navigation between pages).
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setUser(userData.success);
        }
      } catch(err) {
        console.log('Error fetching user: ', err);
      }
    };
    fetchUser();
  }, [location]);

  /**
   * Navigates to the homepage when app name is clicked.
   * @param {Event} e - Click event
   */
  const handleClickAppName = (e) => {
    e.preventDefault();
    return navigate('/');
  };

  /**
   * Handles user logout by calling logout API and resetting user state.
   * @param {Event} e - Click event
   */
  const handleClickLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      setUser(false);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  /**
   * Navigates to registration page.
   * @param {Event} e - Click event
   */
  const handleClickCreateAccount = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  /**
   * Navigates to login page.
   * @param {Event} e - Click event
   */
  const handleClickLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  /**
   * Navigates to cart page and logs current cart contents.
   * @param {Event} e - Click event
   */
  const handleClickGetCart = async (e) => {
    e.preventDefault();
    const response = await getCartInSession();
    console.log('This is the response from handleClickGetCart', response);
    return navigate(`/cart`);
  };

  /**
   * Navigates to orders page (requires authentication).
   * @param {Event} e - Click event
   */
  const handleClickOrder = (e) => {
    e.preventDefault();
    navigate('/orders');
  };

  return (
    <header className="header">
      <h1 className="app-name" onClick={handleClickAppName}>Portfolio Project: E-Commerce App</h1>
      <div className="buttons">
      <button onClick={handleClickGetCart}>cart</button>
        {user ? (
          <>
            <button onClick={handleClickOrder}>Orders</button>
            <button onClick={handleClickLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={handleClickLogin}>Login</button>
            <button onClick={handleClickCreateAccount}>Create account</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
