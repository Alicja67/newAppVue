const express = require('express');
const Titles = require('../models/titles.model');

const router = express.Router();

//GET ALL CONTACTS BY ID

//ADD NEW DATA
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const post = new Titles({ title });
    const newTitle = await post.save();
    res.send({newTitle});
  } catch(err) {
    res.status(400).json({ error: err.message || err.toString() });
  }
});

module.exports = router;