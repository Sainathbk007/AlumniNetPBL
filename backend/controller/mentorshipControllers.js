const pool = require('../db/db');

const getMentorships = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mentorships');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMentorshipRequest = async (req, res) => {
  const { studentId, alumniId, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO mentorships (student_id, alumni_id, message) VALUES ($1, $2, $3) RETURNING *',
      [studentId, alumniId, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMentorships, createMentorshipRequest };