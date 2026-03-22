/**
 * RegistrationPage Component
 * 
 * User registration page for creating new accounts.
 * Collects user information and automatically logs in after successful registration.
 * 
 * Features:
 *   - Registration form with first name, last name, phone, email, password
 *   - Server-side form submission
 *   - Auto-login after successful registration
 *   - Link to login page for existing users
 * 
 * @module components/RegistrationPage
 */

import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { createAccount } from "../../api/registration";
import { login } from "../../api/userAuth";
import './registrationPage.css';

/**
 * RegistrationPage Component
 * Renders the registration form for new users.
 * 
 * @returns {JSX.Element} Rendered registration page
 */
const RegistrationPage = () => {
  const navigate = useNavigate();

  /**
   * Navigates to login page for users who already have an account.
   * @param {Event} e - Click event
   */
  const handleClickLogin = (e) => {
    e.preventDefault();
    return navigate('/login');
  };

  return (
    <div id="registrationPage">
      <h1>Create account</h1>
      <div className="registrationPage-already-have-account">
        <h3>Do you already have an account?</h3>
        <h3>▼</h3>
        <button onClick={handleClickLogin}>Login</button>
      </div>
      <Form className="registration-form" method="post" action='/register'>
        <label htmlFor="firstName">
          First name:
          <input type="text" name="firstName"/>
        </label>
        <br/>
        <label htmlFor="lastName">
          Last name:
          <input type="text" name="lastName"/>
        </label>
        <br/>
        <label htmlFor="phoneNumber">
          Phone number:
          <input type="tel" name="phoneNumber"/>
        </label>
        <br/>
        <label htmlFor="email">
          E-mail:
          <input type="email" name="email"/>
        </label>
        <br/>
        <label htmlFor="password">
          password:
          <input type="password" name="password"/>
        </label>
        <br/>
        <button type="submit">Create account</button>
      </Form>
    </div>
  );
};

/**
 * Form action handler for server-side registration processing.
 * Called by React Router when form is submitted.
 * Creates new user account and automatically logs them in.
 * 
 * @param {Object} request - Form request object from React Router containing form data
 * @returns {Object} Redirect on success, error object on failure
 */
export const registrationAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    userName: data.get('email'),
    email: data.get('email'),
    password: data.get('password')
  };

  try {
    // Create new user account via API
    const newUser = await createAccount(
      submission.firstName,
      submission.lastName,
      submission.userName,
      submission.email,
      submission.password
    );
    
    // Auto-login after successful registration
    const loginAuthentication = await login(submission.email, submission.password);
    if (newUser && loginAuthentication) {
      console.log('Account created and auto logged in');
      return redirect('/');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { error: error.message };
  }
};

export default RegistrationPage;
