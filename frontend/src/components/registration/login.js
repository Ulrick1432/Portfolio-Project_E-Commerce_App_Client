import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { login } from "../../api/userAuth";

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
      <Form method="post" action="/login">
        <label>
          E-mail
          <input type="email" name="email"/>
        </label>
        <label>
          Password
          <input type="password" name="password"/>
        </label>
        <button type="submit">Login</button>
      </Form>
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