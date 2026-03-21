/**
 * User authentication API module.
 * Handles login, logout, and retrieving current user data.
 */
import { api } from './index';

/**
 * Authenticates a user with username and password.
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 * @returns {Promise<boolean>} True if login successful, false otherwise
 */
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
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error occurred during login: ', err);
    throw err;
  }
};

/**
 * Logs out the current user by destroying the server-side session.
 * @returns {Promise<void>}
 * @throws {Error} If the logout request fails
 */
export const logout = async () => {
  try {
    const response = await fetch(`${api}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.err);
    }
  } catch (err) {
    console.error('Error occurred during logout: ', err);
    throw err;
  }
};

/**
 * Retrieves the currently authenticated user's data from the server.
 * @returns {Promise<Object>} User data object containing success status and user info
 * @throws {Error} If authentication fails or user is not logged in
 */
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

