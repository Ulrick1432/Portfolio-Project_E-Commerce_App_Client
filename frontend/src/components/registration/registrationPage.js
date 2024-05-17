import React from "react";
import { redirect } from "react-router-dom";

const RegistrationPage = () => {
  return (
    <div id="registrationPage">
      <button onClick={redirect("/create_account")}>Create account</button>
      <button >Login</button>

    </div>
  )
}

export default RegistrationPage;