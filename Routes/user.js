const express = require('express');
const router = express.Router();

// GET /api/users - Get all users
router.get('/users', (req, res) => {
    // Your logic to fetch all users
    res.json({ message: 'Get all users' });
});

// GET /api/users/:id - Get a single user by id
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Your logic to fetch user by id
    res.json({ message: `Get user with id ${userId}` });
});

// POST /api/users - Create a new user
router.post('/users', (req, res) => {
    // Your logic to create a new user
    res.json({ message: 'Create a new user' });
});

// PUT /api/users/:id - Update a user by id
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Your logic to update user by id
    res.json({ message: `Update user with id ${userId}` });
});

// DELETE /api/users/:id - Delete a user by id
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // Your logic to delete user by id
    res.json({ message: `Delete user with id ${userId}` });
});

module.exports = router;
