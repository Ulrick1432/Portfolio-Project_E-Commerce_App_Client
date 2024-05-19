import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
const navigate = useNavigate();

  const handleClickCreateAccount = (e) => {
    e.preventDefault();
    navigate("/registration");
  }

  const handleClickLogin = () => {
    return navigate('/login');
  }

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Portfolio Project: E-Comerce App</h1>
      </header>
      <button onClick={handleClickLogin}>Login</button>
      <br />
      <button onClick={handleClickCreateAccount}>Create account</button>
  </div>
  );
}

export default HomePage;