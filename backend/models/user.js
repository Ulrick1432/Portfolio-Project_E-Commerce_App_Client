const db = require('../db/index');
const bcrypt = require('bcrypt');

module.exports = class UserModel {
  async registerUser(data) {
    const { firstName, lastName, userName, email, password} = data;
    try {
      // Check if the email is already registered
      const doesEmailExist = await db.query('SELECT * FROM "Users" WHERE "Email" = $1', [email]);
      if(doesEmailExist.rows[0]) {
        throw new Error('Email already registrered');
      }

      // Hash the password before storing it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert the new user into the database
      const registerUser = await db.query(
        'INSERT INTO "Users" ("First_Name","Last_Name","Username", "Email", "Password") VALUES ($1, $2, $3, $4, $5 ) RETURNING *',
        [firstName, lastName, userName, email, hashedPassword]
      );
      
      if (registerUser.rows?.length) {
        return registerUser.rows[0];
      }
      return null;
    } catch(err) {
      console.error('Error registering user:', err.message);
      throw new Error('Error registering user: ' + err.message);
    }
  };

  async login(username, password) {
    try {
      // Check if user exists
      const findUsername = await db.query('SELECT * FROM "Users" WHERE "Username" = $1', [username]);
      const user = findUsername.rows[0];
      
      // If no user found, reject
      if (!user) {
        throw new Error('Error logging in (wrong username or password)');
      }

      const isValidPassword = await bcrypt.compare(password, user.Password);
      if (!isValidPassword) {
        throw new Error('Error logging in (wrong username or password)');
      }

      return user;  

    } catch(err) {
      throw new Error(err.message);
    }
  };

  async getUserById(id) {
    try {
      const findUserById = await db.query('SELECT * FROM "Users" WHERE "id" = $1', [id]);
      const user = findUserById.rows[0];
      if (!user) {
        throw new Error('Error Cant find user by id');
      }
      return user;

    } catch(err) {
      throw new Error(err.message);
    }
  };
}