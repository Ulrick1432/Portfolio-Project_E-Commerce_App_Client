import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { login } from "../../api/userAuth";
import { api } from "../../api";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleClickRegistration = () => {
    return navigate('/register');
  };

  const handleClickHome = () => {
    return navigate('/');
  };

  const handleClickGoogleLogin = () => {
    window.open(`${api}/auth/google`, '_self');
  };
  
  return (
    <div id="loginPage">
      <h1>Login</h1>
      <div>
        <button onClick={handleClickHome}>Home</button>
        <h3>Do you not already have an account? click here to create one →</h3>
        <button onClick={handleClickRegistration}>Create account</button>
      </div>
      <Form method="post" action="/login">
        <label>
          E-mail
          <input type="email" name="email"/>
        </label>
        <label>
          Password
          <input type="password" name="password"/>
        </label>
        <button type="submit" >Login</button>
      </Form>
      <button onClick={handleClickGoogleLogin}>login with Google</button>
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