const db = require('../db/index');

module.exports = class UserModel {
  async registerUser(firstname, lastname, username, email, password) {
    try {
      // Check if the email is already registered
      const existingUserQuery = await db.query('SELECT * FROM "Users" WHERE "Email" = $1', [email]);
      const existingUser = existingUserQuery.rows[0];
      if (existingUser) {
        throw new Error('Email already registrered');
      }

      // Insert the new user into the databse
      const newUserQuery = await db.query(
        'INSERT INTO "Users" ("First_Name","Last_Name","Username", "Email", "Password") VALUES ($1, $2, $3, $4, $5 ) RETURNING *',
        [firstname, lastname, username, email, password]
        );
      const newUser = newUserQuery.rows[0];
      return newUser;
    } catch (error) {
      throw new Error('Error registering user: ' + error.message);
    }
  }

  async findByUsername(username) {
    try {
      const findUsername = await db.query('SELECT * FROM "Users" WHERE Username = $1', [username]);
      if (findUsername.rows?.length) {
        return findUsername.rows[0];
      }
  
      return null;

    } catch(err) {
      throw new Error('Error finding username: ' + err.message);
    }
  }

  async findById(id) {
    try {
      const findId = await db.query('SELECT * FROM "Users" WHERE id = $1', [id]);
      if (findId.rows?.length) {
        return findId.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error('Error finding users id: ' + err.message);
    }
  }

  async isValidPassword(password) {
    try {
      const validPassword = await DataView.query('SELECT * FROM "Users" WHERE Password = $1', [password]);
      if (validPassword.rows?.length) {
        return validPassword.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error finding password: ' + err.message);
    }
  }
}
