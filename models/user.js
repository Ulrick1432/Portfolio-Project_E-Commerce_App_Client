const db = require('../db/index');

module.exports = class UserModel {
  async registerUser(firstname, lastname, username, email, password) {
    try {
      // Check if the email is already registered
      const existingUserQuery = await db.query('SELECT * FROM "Users" WHERE "Email" = $1', [email])
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
}
