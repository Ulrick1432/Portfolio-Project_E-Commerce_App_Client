import { api } from ".";

export const createAccount = async (firstName, lastName, userName, email, password) => {
  const response = await fetch(`${api}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      userName,
      email,
      password
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.err);
  }

  return await response.json();
};

