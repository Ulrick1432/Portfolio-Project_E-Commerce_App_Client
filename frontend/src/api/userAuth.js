import { api } from '.';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${api}/auth/login`, {
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
    console.error('Error occurred during login: ', err);
    throw err; // Re-throw the original error for the caller to handle
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${api}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' // Ensure credentials are included to handle the session correctly
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.err);
    }
  } catch (err) {
    console.error('Error occurred during logout: ', err);
    throw err; // Re-throw the original error for the caller to handle
  }
};

export const getUser = async () => {
  try {
    const response = await fetch(`${api}/auth/login/success`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.status === 200) {
      const userData = await response.json();
      return userData;
    } else {
      throw new Error('Authentication failed');
    }
  } catch (err) {
    console.error(err);
  }
}

