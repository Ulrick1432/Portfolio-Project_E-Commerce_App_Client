/**
 * Login Component
 * 
 * User login page with email/password and Google OAuth options.
 * Provides both traditional form submission and social login.
 * 
 * Features:
 *   - Email/password login form (server-side form action)
 *   - Google OAuth login button
 *   - Link to registration page for new users
 *   - Form action handler for server-side authentication
 * 
 * @module components/Login
 */

import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { login } from "../../api/userAuth";
import { api } from "../../api";
import './login.css';

/**
 * LoginPage Component
 * Renders the login form with email/password and social login options.
 * 
 * @returns {JSX.Element} Rendered login page
 */
const LoginPage = () => {
  const navigate = useNavigate();

  /**
   * Navigates to registration page.
   * @param {Event} e - Click event
   */
  const handleClickRegistration = (e) => {
    e.preventDefault();
    return navigate('/register');
  };

  /**
   * Initiates Google OAuth login flow by redirecting to backend auth endpoint.
   * @param {Event} e - Click event
   */
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
  );
};

/**
 * Form action handler for server-side login processing.
 * Called by React Router when form is submitted.
 * 
 * @param {Object} request - Form request object from React Router
 * @returns {Object|null} Redirect on success, null or error object on failure
 */
export const loginAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get('email'),
    password: data.get('password')
  };

  try {
    const loginAuthentication = await login(submission.email, submission.password);
    if (loginAuthentication) {
      return redirect('/');
    }
    alert('Wrong email or password - try again');
    return null;
  } catch(err) {
    return { error: err.message };
  }
};

export default LoginPage;
