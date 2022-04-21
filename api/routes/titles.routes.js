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

module.exports = router;
