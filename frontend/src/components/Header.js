import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/userAuth";
import { getCartInSession } from "../api/cart";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  console.log(user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:4000/auth/login/success', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          const userData = await response.json();
          setUser(userData.success);
        } else {
          throw new Error('Authentication failed');
        }
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

  
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
  };

  return (
    <header className="header">
      <h1>Portfolio Project: E-Commerce App</h1>
      {user ? (
        <button onClick={handleClickLogout}>Logout</button>
      ) : (
        <div>
          <button onClick={handleClickLogin}>Login</button>
          <br />
          <button onClick={handleClickCreateAccount}>Create account</button>
        </div>
      )}
      <button onClick={handleClickGetCart}>cart</button>
    </header>
  );
}

export default Header;