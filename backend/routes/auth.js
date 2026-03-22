/**
 * Authentication Routes
 * 
 * Handles user authentication including registration, login (local & Google OAuth),
 * session management, and logout functionality.
 * 
 * @module routes/auth
 */

const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

/**
 * Mounts authentication routes onto the Express application.
 * All routes are prefixed with '/auth'.
 * 
 * @param {Object} app - The Express application instance
 * @param {Object} passport - The Passport.js instance for authentication strategies
 */
module.exports = (app, passport) => {
  app.use('/auth', router);

  /**
   * POST /auth/register
   * Registers a new user with email and password.
   * 
   * Request Body:
   *   - { email: string, password: string, firstName: string, lastName: string }
   * 
   * Response:
   *   - 200: User registered successfully, returns user data
   *   - 500: Registration failed, returns error message
   */
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body;
      const response = await UserModelInstance.registerUser(data);
      res.status(200).send(response);
    } catch (err) {
      console.error('Error during user registration:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * POST /auth/login
   * Authenticates user using local strategy (email/password).
   * Passport.js middleware handles validation and session creation.
   * 
   * Success: Redirects to /auth/login/success
   * Failure: Redirects to /auth/login/failed
   */
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failed'
  }));

  /**
   * GET /auth/google
   * Initiates Google OAuth authentication flow.
   * Redirects user to Google's consent screen.
   * 
   * Scope:
   *   - profile: Access to basic Google profile info
   *   - email: Access to user's email address
   */
  router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  }));

  /**
   * GET /auth/google/callback
   * Handles the OAuth callback from Google after user consent.
   * Creates or updates user session based on Google profile.
   * 
   * Success: Redirects to frontend application
   * Failure: Redirects to /auth/login/failed
   */
  router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.FRONTEND_ENDPOINT,
    failureRedirect: '/auth/login/failed'
  }));

  /**
   * GET /auth/login/success
   * Checks if a user is currently authenticated via session.
   * Used by frontend to determine login state.
   * 
   * Response:
   *   - 200: { success: true, message: 'login successful', user: {...} }
   *   - 200: { success: false, message: 'No user is logged in' }
   */
  router.get('/login/success', (req, res, next) => {
    try {
      if(req.user) {
        return res.status(200).json({
          success: true,
          message: 'login successful',
          user: req.user
        });
      }
      return res.status(200).send({
        success: false,
        message: 'No user is logged in'
      });
    } catch(err) {
      next(err);
    }
  });

  /**
   * GET /auth/login/failed
   * Returns 401 status when login authentication fails.
   * Used as redirect target when local or OAuth login fails.
   * 
   * Response:
   *   - 401: { success: false, message: 'No user is logged in' }
   */
  router.get('/login/failed', (req, res, next) => {
    try {
        res.status(401).send({
          success: false,
          message: 'No user is logged in'
        });
    } catch(err) {
      next(err);
    }
  });

  /**
   * POST /auth/logout
   * Logs out the current user by destroying their session.
   * Clears the session cookie and invalidates server-side session.
   * 
   * Response:
   *   - 200: { success: true, message: 'Logged out successfully' }
   *   - 500: Logout failed, returns error
   */
  router.post('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) {
        console.error('Error during logout:', err);
        return next(err);
      }
  
      // Destroy the session on the server
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return next(err);
        }
  
        // Clear the session cookie from the client
        res.clearCookie('uph_first_session');
  
        // Send success response to client
        res.status(200).json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    });
  });
  
};
