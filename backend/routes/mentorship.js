const express = require('express');
const { getMentorships, createMentorshipRequest } = require('../controllers/mentorshipController');
const router = express.Router();

router.get('/', getMentorships); // Get all mentorships
router.post('/request', createMentorshipRequest); // Create a mentorship request

module.exports = router;