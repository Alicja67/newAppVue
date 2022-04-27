const express = require('express');
const Titles = require('../models/titles.model');

const router = express.Router();

//GET ALL TITLES
router.get('/', async (req, res) => {
  try {
    const allData = await Titles.find();
    console.log(allData.length);
    if(allData.length === 0) {
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
  try {
    const data = await Titles.find();
    console.log(data);
    console.log(data.length);
    if(data.length === 0) {
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
