import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { createAccount } from "../../api/registration";
const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    return navigate('/login');
  }

  return (
    <div id="registrationPage">
      <h1>Create account</h1>
      <div>
        <h3>Do you already have an account? click here →</h3>
        <button onClick={handleClickLogin}>Login</button>
      </div>
      <Form method="post" action='/register'>
        <label>
          First name:
          <input type="text" name="firstName"/>
        </label>
        <br/>
        <label>
          Last name:
          <input type="text" name="lastName"/>
        </label>
        <br/>
        <label>
          Phone number:
          <input type="tel" name="phoneNumber"/>
        </label>
        <br/>
        <label>
          E-mail:
          <input type="email" name="email"/>
        </label>
        <br/>
        <label>
          password:
          <input type="password" name="password"/>
        </label>
        <br/>
        <button type="submit">Create account</button>
      </Form>
    </div>
  )
}

export const registrationAction = async ({ request }) => {
  console.log(request);
  const data = await request.formData();

  const submission = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    userName: data.get('email'),
    email: data.get('email'),
    password: data.get('password')
  }

  // send post request
  try {
    const newUser = await createAccount(
      submission.firstName,
      submission.lastName,
      submission.userName,
      submission.email,
      submission.password
    );
    if (newUser) {
      return redirect('/')
    }
  } catch (error) {
    return { error: error.message };
  }
}

export default RegistrationPage;