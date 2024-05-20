import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../api/userAuth";

const HomePage = () => {
const navigate = useNavigate();
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {

  const fetchAuthenticationStatus = async () => {
    try {
      const response = await isAuthenticated();
      setIsLoggedIn(response.authentication);
    } catch(err) {
      console.error("Error fetching authentication status:", error);
    }
  };

  fetchAuthenticationStatus();
}, []);

  const handleClickCreateAccount = (e) => {
    e.preventDefault();
    navigate("/register");
  }

  const handleClickLogin = () => {
    return navigate('/login');
  }

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Portfolio Project: E-Comerce App</h1>
      </header>
      {isLoggedIn ? (
        <buttton>Logout</buttton>
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