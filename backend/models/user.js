const db = require('../db/index');
const bcrypt = require('bcrypt');

module.exports = class UserModel {
  async registerUser(data) {
    const { firstname, lastname, username, email, password, googleId } = data;
    try {
      // Check if the email is already registered
      const doesEmailExist = await db.query('SELECT * FROM "users" WHERE "email" = $1', [email]);
      console.log('Check if the email is already registered');
      if (doesEmailExist.rows[0]) {
        throw new Error('Email already registered');
      }

      // Hash the password before storing it if provided
      let hashedPassword = null;
      if (password) {
        console.log('Hash the password before storing it if provided');

        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
      }

      // Insert the new user into the database
      const registerUser = await db.query(
        'INSERT INTO "users" ("firstname", "lastname", "username", "email", "password", "googleId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [firstname, lastname, username, email, hashedPassword, googleId]
      );
      console.log('Insert the new user into the database');
      
      if (registerUser.rows?.length) {
        console.log('returns → registerUser.rows[0] → ' +  registerUser.rows[0]);
        return registerUser.rows[0];
      }
      console.log('returns null');
      return null;
    } catch(err) {
      throw new Error('Error registering user: ' + err.message);
    }
  }

  async login(username, password) {
    try {
      // Check if user exists
      const findUsername = await db.query('SELECT * FROM "users" WHERE "username" = $1', [username]);
      const user = findUsername.rows[0];
      
      // If no user found, reject
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
  };

  async getUserById(id) {
    try {
      const findUserById = await db.query('SELECT * FROM "users" WHERE "id" = $1', [id]);
      const user = findUserById.rows[0];
      if (!user) {
        throw new Error('Error Can\'t find user by id');
      }
      return user;

    } catch(err) {
      throw new Error(err.message);
    }
  };

  async getUserByGoogleId(id) {
    try {
      let findUserById = await db.query('SELECT * FROM "users" WHERE "googleId" = $1', [id]);
      const user = findUserById.rows[0];
      console.log('This is user in getUserByGoogleId → ' + user.googleId);
      if (!user) {
        console.log('user was not found in getUserByGoogleId');
        console.log('if getUserByGoogleId is not found this is what it returns ' + findUserById.array[0].id);
        return findUserById.rows[0];
      }
      console.log('user was found in getUserByGoogleId');
      return user
    } catch(err) {
      throw new Error(err.message);
    }
  }
  
  async googleIdFindOrCreateAcc(profile) {
    console.log(profile);
    console.log('This is googleId in googleIdFindOrCreateAcc → ' + profile.id);
    try {
      let user = await this.getUserByGoogleId(profile.id);
      if (!user) {
        console.log('No user found in googleIdFindOrCreateAcc');
        console.log('firstName: ' + profile.name.givenName + ' lastName: ' + profile.name.familyName);
        user = this.registerUser({
          firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            GoogleId: profile.id
        });
        return user;
      }
      console.log('googleIdFindOrCreateAcc returns user');
      return user;
    } catch(err) {
      throw new Error(err);
    }
  };

}