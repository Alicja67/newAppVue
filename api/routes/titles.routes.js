const express = require('express');
const Titles = require('../models/titles.model');

const router = express.Router();

//GET ALL TITLES
router.get('/', async (req, res) => {
  const allData = await Titles.find();
  console.log(allData);
  try {
    if(allData !== Array.isArray([])) {
      res.status(404).json({message: 'Data not found'});
    } else {
      res.status(200).json(allData);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//DELETE ALL TITLES
router.delete('/', async (req, res) => {
  const data = await Titles.find();
  console.log(data);
  try {
    if(data !== Array.isArray([])) {
      res.status(404).json({ message: 'Data not found.' });
    } else {
      await Titles.deleteMany();
      res.status(204).json({ message: 'All data were deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
