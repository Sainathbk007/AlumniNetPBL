const express = require('express');
const { getUsers, getUserById, updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers); // Get all users
router.get('/:id', getUserById); // Get user by ID
router.put('/:id', updateUser); // Update user

module.exports = router;