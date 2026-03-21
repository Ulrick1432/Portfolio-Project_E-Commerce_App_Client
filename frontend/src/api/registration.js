/**
 * User registration API module.
 * Handles creating new user accounts.
 */
import { api } from './index';

/**
 * Registers a new user account.
 * @param {string} firstname - User's first name
 * @param {string} lastname - User's last name
 * @param {string} username - Desired username
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} The created user object
 * @throws {Error} If registration fails (e.g., email already exists)
 */
export const createAccount = async (firstname, lastname, username, email, password) => {
  const response = await fetch(`${api}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname,
      lastname,
      username,
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

