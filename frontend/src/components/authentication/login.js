import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { login } from "../../api/userAuth";
import { api } from "../../api";
import './login.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleClickRegistration = (e) => {
    e.preventDefault();
    return navigate('/register');
  };

  const handleClickGoogleLogin = (e) => {
    e.preventDefault();
    window.open(`${api}/auth/google`, '_self');
  };
  
  return (
    <div id="loginPage">
      <h1>Login</h1>
      <Form className="login-form" method="post" action="/login">
        <label>
          E-mail
          <input type="email" name="email" required/>
        </label>
        <label>
          Password
          <input type="password" name="password" required/>
        </label>
        <button type="submit" >Login</button>
      </Form>
      <div className="other-options-login-form">
        <button onClick={handleClickGoogleLogin}>login with Google</button>
        <button onClick={handleClickRegistration}>Create account</button>
      </div>
    </div>
  )
}

export const loginAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get('email'),
    password: data.get('password')
  }

  try {
    const loginAuthentication = await login(submission.email, submission.password);
    if (loginAuthentication) {
      return redirect('/');
    }
    alert('Wrong email or password - try again');
    return null;
  } catch(err) {
    return { error: err.message }
  }
}

export default LoginPage;