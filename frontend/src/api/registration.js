export const createAccount = async (firstName, lastName, userName, email, password) => {
  const response = await fetch(`http://localhost:4000/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      userName,
      email,
      password
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.err);
  }

  const newUser = await response.json();
  return newUser;
};

