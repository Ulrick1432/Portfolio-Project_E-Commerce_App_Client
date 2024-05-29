import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/userAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

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
        if(response.status === 200) {
          const userData = await response.json();
          setUser(userData.success);
        }
        throw new Error('authentication failed')
      } catch(err) {
        return err;
      }
    }
    getUser();
  }, []);

  const handleClickLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      return setUser(false);
    } catch(err) {
      return { errer: err };
    }
  };

  const handleClickCreateAccount = (e) => {
    e.preventDefault();
    return navigate("/register");
  };

  const handleClickLogin = () => {
    return navigate('/login');
  };

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Portfolio Project: E-Comerce App</h1>
      </header>
      {user ? (
        <button onClick={handleClickLogout}>Logout</button>
      ) : (
      <div>
        <button onClick={handleClickLogin}>Login</button>
        <br />
        <button onClick={handleClickCreateAccount}>Create account</button>
      </div>
      )}
  </div>
  );
}

export default HomePage;