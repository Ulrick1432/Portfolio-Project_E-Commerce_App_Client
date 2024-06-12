import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../api/userAuth";
import { getCartInSession } from "../../api/cart";
import { getUser } from "../../api/userAuth";
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(false);

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

  const handleClickAppName = (e) => {
    e.preventDefault();
    return navigate('/');
  };
  
  const handleClickLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      setUser(false);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const handleClickCreateAccount = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleClickLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleClickGetCart = async (e) => {
    e.preventDefault();
    const response = await getCartInSession();
    console.log('This is the response from handleClickGetCart', response);
    return navigate(`/cart`);
  };

  return (
    <header className="header">
      <h1 className="app-name" onClick={handleClickAppName}>Portfolio Project: E-Commerce App</h1>
      <div className="buttons">
        {user ? (
          <button onClick={handleClickLogout}>Logout</button>
        ) : (
          <>
            <button onClick={handleClickLogin}>Login</button>
            <button onClick={handleClickCreateAccount}>Create account</button>
          </>
        )}
        <button onClick={handleClickGetCart}>cart</button>
      </div>
    </header>
  );
}

export default Header;