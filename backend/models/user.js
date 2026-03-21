const db = require('../db/index');
const bcrypt = require('bcrypt');

module.exports = class UserModel {
  /**
   * Registers a new user account.
   * @param {Object} data - User registration data
   * @param {string} data.firstname - User's first name
   * @param {string} data.lastname - User's last name
   * @param {string} data.username - Desired username
   * @param {string} data.email - User's email address
   * @param {string} [data.password] - User's password (optional for Google OAuth)
   * @param {string} [data.googleId] - Google OAuth ID (optional)
   * @returns {Promise<Object|null>} The newly created user object, or null if creation fails
   * @throws {Error} If email already exists or database error occurs
   */
  async registerUser(data) {
    const { firstname, lastname, username, email, password, googleId } = data;
    try {
      const doesEmailExist = await db.query('SELECT * FROM "users" WHERE "email" = $1', [email]);
      if (doesEmailExist.rows[0]) {
        throw new Error('Email already registered');
      }

      let hashedPassword = null;
      if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
      }

      const registerUser = await db.query(
        'INSERT INTO "users" ("firstname", "lastname", "username", "email", "password", "googleId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [firstname, lastname, username, email, hashedPassword, googleId]
      );
      
      if (registerUser.rows?.length) {
        return registerUser.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error registering user: ' + err.message);
    }
  }

  /**
   * Authenticates a user with username and password.
   * @param {string} username - The username
   * @param {string} password - The password to verify
   * @returns {Promise<Object>} The authenticated user object
   * @throws {Error} If credentials are invalid
   */
  async login(username, password) {
    try {
      const findUsername = await db.query('SELECT * FROM "users" WHERE "username" = $1', [username]);
      const user = findUsername.rows[0];
      
      if (!user) {
        throw new Error('Error logging in (wrong username or password)');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Error logging in (wrong username or password)');
      }

      return user;
    } catch(err) {
      throw new Error(err.message);
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {number} id - The user ID
   * @returns {Promise<Object>} The user object
   * @throws {Error} If user not found or database error
   */
  async getUserById(id) {
    try {
      const findUserById = await db.query('SELECT * FROM "users" WHERE "id" = $1', [id]);
      const user = findUserById.rows[0];
      if (!user) {
        throw new Error('Error: Can\'t find user by id');
      }
      return user;
    } catch(err) {
      throw new Error(err.message);
    }
  }

  /**
   * Retrieves a user by their Google ID.
   * @param {string} id - The Google OAuth ID
   * @returns {Promise<Object|null>} The user object, or null if not found
   * @throws {Error} If database query fails
   */
  async getUserByGoogleId(id) {
    try {
      const result = await db.query(
        'SELECT * FROM "users" WHERE "googleId" = $1',
        [id]
      );

      const user = result.rows[0];
      if (!user) {
        return null;
      }
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Finds an existing user by Google ID or creates a new account.
   * @param {Object} profile - Google OAuth profile object
   * @param {string} profile.id - Google user ID
   * @param {Object} profile.name - User's name object
   * @param {string} profile.name.givenName - User's first name
   * @param {string} profile.name.familyName - User's last name
   * @param {Array} profile.emails - Array of email objects
   * @param {string} profile.emails[0].value - Primary email address
   * @returns {Promise<Object>} The existing or newly created user object
   * @throws {Error} If user creation fails
   */
  async googleIdFindOrCreateAcc(profile) {
    try {
      let user = await this.getUserByGoogleId(profile.id);

      if (!user) {
        user = await this.registerUser({
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          googleId: profile.id,
          email: profile.emails?.[0]?.value
        });
      }

      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}