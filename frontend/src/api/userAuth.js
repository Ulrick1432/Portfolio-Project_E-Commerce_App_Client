export const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });
    console.log(JSON.stringify({ username, password }));
    console.log('↓ response is from userAuth login.js call');
    console.log(response);

    if (response.status === 200) {
      return true; // Login successful
    } else {
      return false; // Login failed (due to incorrect credentials or other reasons)
    }
  } catch (err) {
    // Handle network errors or other exceptions
    console.error('Error occurred during login:', err);
    throw err; // Re-throw the original error for the caller to handle
  }
};
