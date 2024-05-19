export const createAccount = async (firstName, lastName, userName, email, password) => {
  const response = await fetch(`http://localhost:4000/users/register`, {
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
  const newUser = await response.json();
  return newUser;
};

