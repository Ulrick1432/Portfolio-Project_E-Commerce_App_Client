import React from "react";
import { Form, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleClickRegistration = () => {
    return navigate('/register');
  }

  return (
    <div id="loginPage">
      <h1>Login</h1>
      <div>
        <h3>Do you not already have an account? click here to create one →</h3>
        <button onClick={handleClickRegistration}>Create account</button>
      </div>
      <Form>
        <label>
          E-mail
          <input type="email" name="email"/>
        </label>
        <label>
          Password
          <input type="password" name="password"/>
        </label>
      </Form>
    </div>
  )
}

export default LoginPage;