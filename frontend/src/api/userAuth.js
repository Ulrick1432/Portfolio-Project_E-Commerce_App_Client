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

export const logout = async () => {
  try {
    await fetch('http://localhost:4000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch(err) {
    // Handle network errors or other exceptions
    console.error('Error occurred during logout:', err);
    throw err; // Re-throw the original error for the caller to handle
  }
};
