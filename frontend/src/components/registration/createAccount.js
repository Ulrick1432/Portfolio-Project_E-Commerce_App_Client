import React from "react";
import { Form } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div id="createAccount">
      <Form method="post" action="createAccount">
        <label>
          First name:
          <input type="text" name="lirstName"/>
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
      </Form>
    </div>
  )
}

export default CreateAccount;