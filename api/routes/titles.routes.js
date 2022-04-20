const express = require('express');
const Titles = require('../models/titles.model');

const router = express.Router();

//GET ALL CONTACTS
router.get('/', async (req, res) => {
  // res.json(db.links);
  console.log("All titles");
  try {
    res.status(200).json(await Titles.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//ADD NEW DATA
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const post = new Titles({ title });
    const newTitle = await post.save();
    res.json({message: 'Ok', newTitle});
  } catch(err) {
    res.status(400).json({ error: err.message || err.toString() });
  }
});

module.exports = router;
